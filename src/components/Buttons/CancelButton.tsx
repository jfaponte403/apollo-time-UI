import { Button } from "react-bootstrap";
import React from "react";
import { FaTimes } from 'react-icons/fa';
import "./ButtonStyle.css";

interface Props {
    text_button: string;
    onPress: () => void;
}

const CancelButton: React.FC<Props> = ({ text_button, onPress }) => {
    return (
        <Button className="btn-cancel-custom" onClick={onPress}>
            <FaTimes className="mr-2" /> {text_button}
        </Button>
    );
};

export default CancelButton;
