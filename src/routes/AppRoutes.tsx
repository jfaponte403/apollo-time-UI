import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LoginPage from '../pages/LoginPage/LoginPage';
import AdminPage from '../pages/AdminPage/AdminPage';
import TeacherPage from '../pages/TeacherPage/TeacherPage';
import StudentPage from '../pages/StudentPage/StudentPage';
import getAuthToken, {AuthToken} from "../utils/authToken.ts";
import DegreeManagementPage from "../pages/AdminPage/DegreeManagementPage.tsx";

const AppRoutes: React.FC = () => {
    const authToken: AuthToken = getAuthToken();
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                {/* Admin Routes */}
                <Route
                    path="/admin"
                    element={
                        <PrivateRoute
                            isAuthenticated={authToken.isAuthenticated}
                            userRole={authToken.role}
                            allowedRoles={['admin']}
                        />
                    }
                >
                    <Route path="" element={<AdminPage />}>
                        <Route path="profile" element={<>test -----------------------------------------------------------------------------------------</>} />
                        <Route path="users" element={<>test</>} />
                        <Route path="teachers" element={<>test</>} />
                        <Route path="degrees" element={<DegreeManagementPage />} />
                    </Route>
                </Route>


                <Route
                    path="/teacher"
                    element={
                        <PrivateRoute
                            isAuthenticated={authToken.isAuthenticated}
                            userRole={authToken.role}
                            allowedRoles={['teacher']}
                        />
                    }
                >
                    <Route index element={<TeacherPage />} />
                </Route>
                <Route
                    path="/student"
                    element={
                        <PrivateRoute
                            isAuthenticated={authToken.isAuthenticated}
                            userRole={authToken.role}
                            allowedRoles={['student']}
                        />
                    }
                >
                    <Route index element={<StudentPage />} />
                </Route>
                <Route path="*" element={<h2>404 Not Found</h2>} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
