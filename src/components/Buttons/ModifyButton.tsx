import { Button } from "react-bootstrap";
import React from "react";
import { FaEdit } from 'react-icons/fa';
import "./ButtonStyle.css";

interface Props {
    text_button: string;
    onPress: (value: boolean) => void;
}

const ModifyButton: React.FC<Props> = ({ text_button, onPress }) => {
    return (
        <Button className="btn-modify-custom" onClick={() => { onPress(true); }}>
            <FaEdit className="mr-2" /> {text_button}
        </Button>
    );
};

export default ModifyButton;
