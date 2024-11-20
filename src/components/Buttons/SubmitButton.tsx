import { Button, Spinner } from "react-bootstrap";
import React from "react";
import { FaPaperPlane } from 'react-icons/fa';
import "./ButtonStyle.css";

interface Props {
    text_button: string | JSX.Element;
    type?: "button" | "submit" | "reset";
    isLoading?: boolean;
}

const SubmitButton: React.FC<Props> = ({ text_button, type = "button", isLoading = false }) => {
    return (
        <Button type={type} className="btn-submit-custom" disabled={isLoading}>
            {isLoading ? (
                <>
                    <Spinner animation="border" size="sm" /> Logging in...
                </>
            ) : (
                <>
                    <FaPaperPlane className="mr-2" /> {text_button}
                </>
            )}
        </Button>
    );
};

export default SubmitButton;
