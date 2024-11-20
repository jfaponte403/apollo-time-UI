import { Outlet } from "react-router-dom";
import React from "react";
import TeacherSidebar from "../../components/TeacherSidebar/TeacherSidebar.tsx";
import "./TeacherPage.css"

const TeacherPage: React.FC = () => {
    return (
        <main className="student-page d-flex">
            <TeacherSidebar />
            <div className="content flex-grow-1 p-3">
                <Outlet />
            </div>
        </main>
    );
};

export default TeacherPage;
