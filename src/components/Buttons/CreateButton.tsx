import { Button } from "react-bootstrap";
import React from "react";

interface Props {
    text_button: string;
    onPress: (value: boolean) => void;
}

const CreateButton: React.FC<Props> = ({ text_button, onPress }) => {
    return (
        <Button className="btn-custom-create" onClick={() => { onPress(true); }}>
            {text_button}
        </Button>
    );
};

export default CreateButton;
