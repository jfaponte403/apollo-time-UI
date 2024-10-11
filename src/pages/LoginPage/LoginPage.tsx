import React, {useState} from "react";
import {Container, Form, Button, Spinner} from "react-bootstrap";
import {login} from "../../api/auth.ts";
import Swal from "sweetalert2";
import axios from "axios";
import "./LoginPageCSS.css";
import getAuthToken from "../../utils/authToken.ts";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const showAlert = async (title: string, text: string, icon: "success" | "error", customClass: string) => {
        await Swal.fire({
            title, text, icon, confirmButtonText: "Okay", customClass: {
                confirmButton: customClass // Use the custom class here
            }
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const postData = {username, password};

        try {
            const response = await login("login", postData);
            if (response && response.status === 200) {
                const token = response.data.token;
                sessionStorage.setItem("token", token);
                await showAlert("Login Successful!", "Welcome back!", "success", "green-button");

                const token_parsed = getAuthToken();

                if (token_parsed.role === "admin") {
                    console.log({"admin": token_parsed.role});
                    window.location.href = "/admin"; // Redirige a admin
                }
                if (token_parsed.role === "student") {
                    console.log({"student": token_parsed.role});
                    window.location.href = "/student"; // Redirige a student
                }
                if (token_parsed.role === "teacher") {
                    console.log({"teacher": token_parsed.role});
                    window.location.href = "/teacher"; // Redirige a teacher
                }

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
                            <i className="fas fa-user input-icon" />
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
                            <i className="fas fa-lock input-icon" />
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
                        <Button variant="primary" type="submit" className="login-button" disabled={isLoading}>
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
