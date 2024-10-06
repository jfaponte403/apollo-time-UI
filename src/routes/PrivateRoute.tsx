import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
    isAuthenticated: boolean;
    userRole: string | null;
    allowedRoles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated, userRole, allowedRoles }) => {
    if (!isAuthenticated) {
        console.log(isAuthenticated)
        console.log(userRole)
        console.log(allowedRoles)

        console.log(isAuthenticated)
        console.log(userRole)
        console.log(allowedRoles)

        console.log(isAuthenticated)
        console.log(userRole)
        console.log(allowedRoles)


        return <Navigate to="/" replace />;
    }

    const normalizedUserRole = userRole ? userRole.toLowerCase() : null;

    if (!allowedRoles.map(role => role.toLowerCase()).includes(normalizedUserRole!)) {
        return <Navigate to="/404" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
