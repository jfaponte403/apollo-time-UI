import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { FaUser, FaCalendarAlt, FaBookOpen, FaSignOutAlt } from 'react-icons/fa';

const TeacherSidebar: React.FC = () => {
    const navItems = [
        { path: 'profile', label: 'Profile', icon: <FaUser /> },
        { path: 'schedule', label: 'Schedule', icon: <FaCalendarAlt /> },
        { path: 'courses', label: 'Courses', icon: <FaBookOpen /> }
    ];

    const handleLogout = () => {
        sessionStorage.clear(); // Clear session storage or any other necessary logout logic
    };

    return (
        <div className={`sidebar`}>
            <Nav className="flex-column">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
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

export default TeacherSidebar;
