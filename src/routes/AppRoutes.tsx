import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LoginPage from '../pages/LoginPage/LoginPage';
import AdminPage from '../pages/AdminPage/AdminPage';
import TeacherPage from '../pages/TeacherPage/TeacherPage';
import StudentPage from '../pages/StudentPage/StudentPage';
import getAuthToken, { AuthToken } from '../utils/authToken';
import DegreeAdminPage from '../pages/AdminPage/DegreeAdminPage/DegreeAdminPage.tsx';
import TeacherAdminPage from '../pages/AdminPage/TeacherAdminPage/TeacherAdminPage';
import StudentAdminPage from '../pages/AdminPage/StudentAdminPage/StudentAdminPage';
import CoursesAdminPage from '../pages/AdminPage/CoursesAdminPage/CoursesAdminPage';
import AdminDashboard from "../components/AdminDashboard/AdminDashboard.tsx";
import TeacherDashboard from "../components/TeacherDashboard/TeacherDashboard.tsx";
import StudentDashboard from "../components/StudentDashboard/StudentDashboard.tsx";
import ScheduleAdminPage from "../pages/AdminPage/ScheduleAdminPage /ScheduleAdminPage.tsx";

const AppRoutes: React.FC = () => {
    const { isAuthenticated, role }: AuthToken = getAuthToken();

    const renderPrivateRoute = (allowedRoles: string[], children: JSX.Element) => (
        <PrivateRoute
            isAuthenticated={isAuthenticated}
            userRole={role}
            allowedRoles={allowedRoles}
        >
            {children}
        </PrivateRoute>
    );

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Admin Routes */}
                <Route path="/admin" element={renderPrivateRoute(['admin'], <AdminPage />)}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="teachers" element={<TeacherAdminPage />} />
                    <Route path="degrees" element={<DegreeAdminPage />} />
                    <Route path="students" element={<StudentAdminPage />} />
                    <Route path="courses" element={<CoursesAdminPage />} />
                    <Route path="schedules" element={<ScheduleAdminPage />} />
                    <Route path="classrooms" element={<></>} />
                    <Route path="subjects" element={<></>} />
                </Route>

                {/* TeacherDashboard Routes */}
                <Route path="/teacher" element={renderPrivateRoute(['teacher'], <TeacherPage />)} >
                    <Route index element={<TeacherDashboard />} />

                </Route>

                {/* Student Routes */}
                <Route path="/student" element={renderPrivateRoute(['student'], <StudentPage />)}>
                    <Route index element={<StudentDashboard />} />
                </Route>

                {/* 404 Page */}
                <Route path="*" element={<h2>404 Not Found</h2>} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
