import { Button } from "react-bootstrap";
import React from "react";
import { FaPlus } from 'react-icons/fa';
import "./ButtonStyle.css";

interface Props {
    text_button: string;
    onPress: (value: boolean) => void;
}

const CreateButton: React.FC<Props> = ({ text_button, onPress }) => {
    return (
        <Button className="btn-create-custom" onClick={() => { onPress(true); }}>
            <FaPlus className="mr-2" /> {text_button}
        </Button>
    );
};

export default CreateButton;
