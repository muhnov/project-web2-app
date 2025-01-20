import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../css/Blockuser.css';

function BlockUser() {
    const navigate = useNavigate(); // Initialize useNavigate
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isBlocked, setIsBlocked] = useState(false);

    // Fetch users from the database
    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/users');
            const data = await response.json();
            if (data.status === 'success') {
                setUsers(data.data);
            } else {
                alert('Failed to fetch users');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Call fetchUsers on initial render and on refresh
    useEffect(() => {
        fetchUsers();
    }, []);

    // Refresh users
    const refreshUsers = () => {
        fetchUsers();
    };

    // Edit user: show form to update
    const editUserHandler = (user) => {
        setEditUser(user);
        setEmail(user.email);
        setIsBlocked(user.isBlocked);
        setPassword('');
        setConfirmPassword('');
    };

    // Handle form submission to update user
    const handleUpdate = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const updatedData = {
            email: email,
            isBlocked: isBlocked,
        };

        if (password) {
            updatedData.password = password;
        }

        try {
            const response = await fetch(`http://localhost:3001/api/users/${editUser.user_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            const data = await response.json();
            if (response.ok) {
                alert('User updated successfully');
                setEditUser(null); // Close the form
                fetchUsers(); // Refresh the list
            } else {
                alert(data.message || 'Failed to update user');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Error updating user');
        }
    };

    // Delete a user
    const deleteUser = async (userId) => {
        if (userId === 1) {
            alert('Admin user (ID 1) cannot be deleted');
            return;
        }

        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setUsers((prevUsers) => prevUsers.filter((user) => user.user_id !== userId));
                alert('User deleted successfully');
            } else {
                const data = await response.json();
                alert(data.message || 'Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Error deleting user');
        }
    };

    // Handle cancel action to return to the user list
    const handleCancelEdit = () => {
        setEditUser(null); // Close the edit form
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setIsBlocked(false);
    };

    // Navigate to the Dashboard
    const goBackToDashboard = () => {
        navigate('/dashboard'); // Adjust the path based on your routing setup
    };

    return (
        <div className="block-user-container">
            <div className="user-list-header">
                <h1 className="block-user-title">Manage Users</h1>
                <button className="refresh-button" onClick={refreshUsers}>Refresh</button>
            </div>

            {editUser && (
                <div className="update-form">
                    <h2>Update User</h2>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Email" 
                    />
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="New Password" 
                    />
                    <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        placeholder="Confirm Password" 
                    />
                    <button onClick={handleUpdate}>Update User</button>
                    <button className="cancel-button" onClick={handleCancelEdit}>Kembali</button>
                </div>
            )}

            <div className="user-list">
                {users.map((user) => (
                    <div key={user.user_id} className="user-card">
                        <div className="user-info">
                            <h2>{user.username}</h2>
                            <p>Email: {user.email}</p>
                            <p>Last Login: {user.loginDate}</p>
                        </div>
                        <div className="user-actions">
                            {user.user_id !== 1 && (
                                <button
                                    className="delete-button"
                                    onClick={() => deleteUser(user.user_id)}
                                >
                                    Delete
                                </button>
                            )}
                            {user.user_id !== 1 && (
                                <button
                                    className="delete-button"
                                    onClick={() => editUserHandler(user)}
                                >
                                    Edit
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Back Button */}
            <button className="back-button" onClick={goBackToDashboard}>
                Kembali ke Dashboard
            </button>
        </div>
    );
}

export default BlockUser;
