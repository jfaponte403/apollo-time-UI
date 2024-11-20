import { Button, Spinner } from "react-bootstrap";
import React from "react";
import { FaSignInAlt } from 'react-icons/fa';
import "./ButtonStyle.css";

interface Props {
    text_button: string | JSX.Element;
    type?: "button" | "submit" | "reset";
    isLoading?: boolean;
}

const LoginButton: React.FC<Props> = ({ text_button, type = "button", isLoading = false }) => {
    return (
        <Button type={type} className="btn-login-custom" disabled={isLoading}>
            {isLoading ? (
                <>
                    <Spinner animation="border" size="sm" /> Logging in...
                </>
            ) : (
                <>
                    <FaSignInAlt className="mr-2" /> {text_button}
                </>
            )}
        </Button>
    );
};

export default LoginButton;
