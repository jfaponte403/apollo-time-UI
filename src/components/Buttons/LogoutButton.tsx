import { Button } from "react-bootstrap";
import React from "react";
import { FaSignOutAlt } from 'react-icons/fa';
import "./ButtonStyle.css";

interface Props {
    text_button: string;
    onPress: () => void;
}

const LogoutButton: React.FC<Props> = ({ text_button, onPress }) => {
    return (
        <Button className="btn-logout-custom" onClick={onPress}>
            <FaSignOutAlt className="mr-2" /> {text_button}
        </Button>
    );
};

export default LogoutButton;
