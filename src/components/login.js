import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/login', { // Endpoint login
                method: 'POST', // Menggunakan POST untuk mengirim data login
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), // Kirim email dan password ke backend
            });

            const data = await response.json();
            console.log(data.isAdmin);
            if (response.ok) {
                if (data.isAdmin) {
                    navigate('/dashboard'); // Arahkan ke dashboard jika admin
                } else {
                    navigate('/home'); // Arahkan ke home jika pengguna biasa
                }
            } else {
                alert(data.message || 'Login gagal, periksa email dan password Anda');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Terjadi kesalahan saat login');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Login</button>
                    <p>Belum punya akun? <Link to="/register">Register</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;
