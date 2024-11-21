import { Button } from "react-bootstrap";
import React from "react";
import { FaTrash } from 'react-icons/fa';
import "./ButtonStyle.css";

interface Props {
    text_button: string;
    onPress: (value: boolean) => void;
}

const DeleteButton: React.FC<Props> = ({ text_button, onPress }) => {
    return (
        <Button className="btn-delete-custom" onClick={() => { onPress(true); }}>
            <FaTrash className="mr-2" /> {text_button}
        </Button>
    );
};

export default DeleteButton;
