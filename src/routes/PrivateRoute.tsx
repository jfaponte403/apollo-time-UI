import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
    isAuthenticated: boolean;
    userRole: string | null;
    allowedRoles: string[];
    children?: React.ReactNode;  // Add this line to define the children prop
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated, userRole, allowedRoles, children }) => {
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    const normalizedUserRole = userRole?.toLowerCase() || '';

    if (!allowedRoles.some(role => role.toLowerCase() === normalizedUserRole)) {
        return <Navigate to="/404" replace />;
    }

    return <>{children || <Outlet />}</>;  // Render children if provided, otherwise render Outlet
};

export default PrivateRoute;
