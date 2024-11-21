import React from 'react';
import SidebarAdmin from "../../components/SidebarAdmin/SidebarAdmin.tsx";
import { Outlet } from 'react-router-dom';
import './AdminPage.css';


const AdminPage: React.FC = () => {

    return (
        <section className="admin-page">
            <SidebarAdmin />
            <div className="content">
                <Outlet/>
            </div>
        </section>
    );
};

export default AdminPage;
