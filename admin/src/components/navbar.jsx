import React from 'react';
import { useAdmin } from '../context/AdminContext';
import './Navbar.css';

const Navbar = () => {
    const { logout } = useAdmin();

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <div className="brand-icon">C</div>
                <div className="brand-text">
                    <span className="brand-name">Clothica</span>
                    <span className="brand-tag">Admin Panel</span>
                </div>
            </div>

            <div className="navbar-right">
                <div className="admin-badge">
                    <div className="admin-avatar">A</div>
                    <span>Administrator</span>
                </div>
                <button className="logout-btn" onClick={logout}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
