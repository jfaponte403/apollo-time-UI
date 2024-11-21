import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { login } from "../../api/auth.ts";
import Swal from "sweetalert2";
import axios from "axios";
import { FaUser, FaLock } from 'react-icons/fa'; // Importing icons from react-icons/fa
import getAuthToken from "../../utils/authToken.ts";
import LoginButton from "../../components/Buttons/LoginButton.tsx";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const showAlert = async (title: string, text: string, icon: "success" | "error", customClass: string) => {
        await Swal.fire({ title, text, icon, confirmButtonText: "Okay", customClass: { confirmButton: customClass } });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await login("login", { username, password });
            if (response?.status === 200 && response.data) {
                sessionStorage.setItem("token", response.data.token);
                await showAlert("Login Successful!", "Welcome back!", "success", "green-button");

                const { role } = getAuthToken();
                const roleRoutes: Record<string, string> = { admin: "/admin", student: "/student", teacher: "/teacher" };
                window.location.href = roleRoutes[role] || "/";  // Redirect based on role
            }
        } catch (error) {
            const errorMessage = axios.isAxiosError(error)
                ? error.response?.data?.message || "Invalid username or password."
                : "Please try again later.";
            await showAlert("Login Failed!", errorMessage, "error", "error-button");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="login-container">
                <Form onSubmit={handleSubmit}>
                    <h1 className="text-center mb-4">Login</h1>
                    <Form.Group controlId="formBasicUsername" className="mb-3">
                        <div className="input-wrapper">
                            <FaUser className="input-icon" />
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" className="mb-3">
                        <div className="input-wrapper">
                            <FaLock className="input-icon" />
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </Form.Group>
                    <div className="text-center">
                        <LoginButton text_button="Login" type="submit" isLoading={isLoading} />
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default LoginPage;
