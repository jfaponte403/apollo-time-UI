import React from 'react';
import { NavLink } from 'react-router-dom';
import './SidebarAdmin.css';
import { Nav } from 'react-bootstrap';
import {FaUserCircle, FaChalkboardTeacher, FaGraduationCap, FaUserGraduate, FaSignOutAlt} from 'react-icons/fa';

const SidebarAdmin: React.FC = () => {
    const navItems = [
        { path: 'profile', label: 'Profile', icon: <FaUserCircle /> },
        { path: 'teachers', label: 'Teachers', icon: <FaChalkboardTeacher /> },
        { path: 'degrees', label: 'Degrees', icon: <FaGraduationCap /> },
        { path: 'students', label: 'Students', icon: <FaUserGraduate /> }
    ];

    const handleLogout = () => {
        sessionStorage.clear()
    }

    return (
        <div className="sidebar">
            <Nav className="flex-column">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path} // Use relative paths
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        aria-label={item.label}
                    >
                        {item.icon} {item.label}
                    </NavLink>
                ))}
            </Nav>
            <Nav className="flex-column logout-wrapper">
                <NavLink
                    onClick={handleLogout}
                    to="/login"
                    className="nav-link button-logout"
                    aria-label="Logout"
                >
                    <FaSignOutAlt /> Logout
                </NavLink>
            </Nav>
        </div>
    );
};

export default SidebarAdmin;
