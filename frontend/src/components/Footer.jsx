import React from 'react';
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
    return (
        <footer className="container my-5 pt-5 border-top">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                {/* Logo & Description */}
                <div className="col">
                    <img src={assets.logo} alt="Logo" className="mb-3" style={{ width: '130px' }} />
                    <p className="text-muted">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    </p>
                </div>

                {/* Company Links */}
                <div className="col">
                    <p className="h6 fw-semibold mb-3">COMPANY</p>
                    <ul className="list-unstyled text-muted">
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                {/* Get in Touch */}
                <div className="col">
                    <p className="h6 fw-semibold mb-3">GET IN TOUCH</p>
                    <ul className="list-unstyled text-muted">
                        <li>Phone: <a href="tel:+1234567890" className="text-muted text-decoration-none">+1 234 567 890</a></li>
                        <li>Email: <a href="mailto:info@company.com" className="text-muted text-decoration-none">info@company.com</a></li>
                    </ul>

                    {/* Social Icons */}
                    <div className="mt-3 d-flex gap-3">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted fs-5">
                            <i className="bi bi-twitter"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted fs-5">
                            <i className="bi bi-instagram"></i>
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted fs-5">
                            <i className="bi bi-facebook"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div className="text-center text-muted small mt-4">
                © {new Date().getFullYear()} Your Company. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
