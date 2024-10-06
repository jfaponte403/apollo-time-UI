import {jwtDecode} from "jwt-decode";

export interface AuthToken {
    isAuthenticated: boolean;
    user: string;
    role: string;
    id: string;
}

export interface JwtPayload {
    sub: string;  // Subject of the token
    user: string; // Name of the user
    exp: number;  // Expiration time (in seconds since epoch)
    role: string; // User role
    id: string
}

const getAuthToken = (): AuthToken => {
    const token: string | null = sessionStorage.getItem("token");

    if (!token) {
        return {
            isAuthenticated: false,
            user: '',
            role: '',
            id: ''
        };
    }

    let decoded: JwtPayload;

    try {
        decoded = jwtDecode<JwtPayload>(token);
    } catch (error) {
        console.error("Failed to decode JWT:", error);
        return {
            isAuthenticated: false,
            user: '',
            role: '',
            id: ''
        };
    }

    const isAuthenticated = decoded.exp * 1000 > Date.now(); // Check if token is expired

    return {
        isAuthenticated,
        user: decoded.user,
        role: decoded.role.toLowerCase(),
        id: decoded.id
    };
};

export default getAuthToken;
