// src/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Register from './components/Register';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import BlockUser from './components/Blockuser';
import UploadPhoto from './components/UploadPhoto';
import Product from './components/Product';
import About from './components/About';
import EditProfile from './components/Editprofile';
import HistoryCommentPage from './components/HistoryCommentPage';
import Settings from './components/Settings';
import DeletePhoto from './components/DeletePhoto';
import EditPhoto from './components/EditPhoto';
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path='/home' element={<Home />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/blockuser' element={<BlockUser />} />
                <Route path='/uploadphoto' element={<UploadPhoto />} />
                <Route path="/product" element={<Product />} />
                <Route path="/about" element={<About />} />
                <Route path="/editprofile" element={<EditProfile />} />
                <Route path="/coment" element={<HistoryCommentPage />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/deletephoto" element={<DeletePhoto />} />
                <Route path="/editphoto" element={<EditPhoto />} />

                <Route path="/" element={<Login />} /> {/* Default route ke login */}
            </Routes>
        </Router>
    );
};

export default App;