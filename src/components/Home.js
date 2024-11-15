// src/components/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductDetailPopup from './ProductDetail';
import '../css/Home.css';

function Home() {
    const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();

    const toggleProfileMenu = () => {
        setProfileMenuOpen(!isProfileMenuOpen);
    };

    const closeProfileMenu = () => {
        setProfileMenuOpen(false);
    };

    const handleImageClick = (title, image, description) => {
        setSelectedProduct({ title, image, description });
    };

    const closePopup = () => {
        setSelectedProduct(null);
    };

    const navigateToDetailPage = () => {
        navigate(`/product-details/${selectedProduct.title}`);
    };

    return (
        <div className="container-home"> 
            <header className="header-home">
            <div className="logo">
                <img src='/udblogo.png'></img>
                </div>
                <nav className="navbar-home">
                    <a href="#">Home</a>
                    <a href="/product">Products</a>
                    <a href="/about">About</a>
                </nav>
                <div className="profile" onClick={toggleProfileMenu}>
                    Profile ▾
                    {isProfileMenuOpen && (
                        <div className="profile-menu-home" onMouseLeave={closeProfileMenu}>
                            <a href="/editprofile">Edit Profile</a>
                            <a href="/coment">Comment</a>
                            <a id="logout" href="/">Logout</a>
                        </div>
                    )}
                </div>
            </header>
            
            <section className="content">
                <div className="main-image">
                    <img src="/udb.jpg" alt="Main Product" />
                    <h1 className="title">Gallery Product UDB</h1>
                </div>
                <div className="gallery">
                    <div className="gallery-item" onClick={() => handleImageClick('Seminar', '/naruto.jpg', 'Description for Seminar')}>
                        <h3>Seminar</h3>
                        <img src="/photo/seminar.jpg" alt="Product 1" />
                        <p><h3>deskripsi</h3>comment</p>
                    </div>
                    <div className="gallery-item" onClick={() => handleImageClick('Organisasi', '/naruto.jpg', 'Description for Organisasi')}>
                        <h3>Organisasi</h3>
                        <img src="photo/organisasi.jpg" alt="Product 2" />
                        <p><h3>deskripsi</h3>comment</p>
                    </div>
                    <div className="gallery-item" onClick={() => handleImageClick('Gedung', '/naruto.jpg', 'Description for Gedung')}>
                        <h3>Gedung</h3>
                        <img src="photo/gedung.jpg" alt="Product 3" />
                        <p><h3>deskripsi</h3>comment</p>
                    </div>
                    <div className="gallery-item" onClick={() => handleImageClick('Fasilitas', '/naruto.jpg', 'Description for Fasilitas')}>
                        <h3>Pameran</h3>
                        <img src="/photo/pameran.jpg" alt="Product 4" />
                        <p><h3>deskripsi</h3>comment</p>
                    </div>
                    <div className="gallery-item" onClick={() => handleImageClick('Fasilitas', '/naruto.jpg', 'Description for Fasilitas')}>
                        <h3>Fasilitas</h3>
                        <img src="/photo/fasilitas.jpg" alt="Product 4" />
                        <p><h3>deskripsi</h3>comment</p>
                    </div>

                </div>
            </section>

            <footer className="footer-home">
                <p>&copy; 2024 Gallery Product UDB. All Rights Reserved.</p>
            </footer>

            {selectedProduct && (
                <ProductDetailPopup
                    image={selectedProduct.image}
                    title={selectedProduct.title}
                    description={selectedProduct.description}
                    onClose={closePopup}
                    onNavigate={navigateToDetailPage}
                />
            )}
        </div>
    );
}

export default Home;
