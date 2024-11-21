import React from 'react';
import { NavLink } from 'react-router-dom';
import './SidebarAdmin.css';
import { Nav } from 'react-bootstrap';
import LogoutButton from "../Buttons/LogoutButton.tsx";
import {
    FaChalkboardTeacher,
    FaGraduationCap,
    FaUserGraduate,
    FaBook,
    FaUsers,
    FaClock,
    FaListUl,
    FaSchool
} from 'react-icons/fa';


const SidebarAdmin: React.FC = () => {
    const navItems = [
        { path: '', label: 'Admin', icon: <FaUsers /> },
        { path: 'teachers', label: 'Teachers', icon: <FaChalkboardTeacher /> },
        { path: 'students', label: 'Students', icon: <FaUserGraduate /> },
        { path: 'courses', label: 'Courses', icon: <FaBook /> },
        { path: 'degrees', label: 'Degrees', icon: <FaGraduationCap /> },
        { path: 'schedules', label: 'Schedules', icon: <FaClock /> },
        { path: 'subjects', label: 'Subjects', icon: <FaListUl /> },
        { path: 'classrooms', label: 'Classrooms', icon: <FaSchool /> },
    ];

    const handleLogout = () => {
        sessionStorage.clear()
        window.location.href = '/'
    }

    return (
        <div className="sidebar">
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
                <LogoutButton text_button="Logout" onPress={handleLogout} />
            </Nav>
        </div>
    );
};

export default SidebarAdmin;
