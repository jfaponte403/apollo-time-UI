import React, { useState } from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import { login } from "../../api/auth.ts";
import "./LoginPageCSS.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const showAlert = async (title: string, text: string, icon: "success" | "error") => {
        await Swal.fire({
            title,
            text,
            icon,
            confirmButtonText: "Okay"
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await login(username, password);
            if (response) {
                await showAlert("Login Successful!", "Welcome back!", "success");
                navigate("/admin");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || "Invalid username or password.";
                await showAlert("Login Failed!", errorMessage, "error");
            } else {
                await showAlert("An error occurred!", "Please try again later.", "error");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="center-container">
                <Form onSubmit={handleSubmit}>
                    <h1 className="text-center mb-4">Login</h1>
                    <Form.Group controlId="formBasicUsername" className="mb-3">
                        <div className="input-icon">
                            <i className="fas fa-user" />
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
                        <div className="input-icon">
                            <i className="fas fa-lock" />
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
                        <Button variant="primary" type="submit" className="btn-login" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Spinner animation="border" size="sm" /> Logging in...
                                </>
                            ) : (
                                "Login"
                            )}
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default LoginPage;
