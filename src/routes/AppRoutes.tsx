import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import PrivateRoute from './PrivateRoute.tsx';
import LoginPage from "../pages/LoginPage/LoginPage.tsx";

const AppRoutes: React.FC = () => {
    // Mocking an authentication state. In a real app, you'd check actual auth state.
    const isAuthenticated = true; // Change to false to test redirection

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}/>
                    }
                >
                    {/*<Route path="" element={<Dashboard/>}/>*/}
                </Route>
                <Route path="*" element={<h2>404 Not Found</h2>}/>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
