import React, {useState} from 'react';
import {Modal, Form} from 'react-bootstrap';
import './DegreeForm.css';
import {createResource} from "../../../api/api.ts";
import Swal from "sweetalert2";
import SubmitButton from "../../Buttons/SubmitButton.tsx";
import CancelButton from "../../Buttons/CancelButton.tsx";

interface DegreeFormProps {
    isOpen: boolean;
    onClose: () => void;
}

interface PayloadCreateDegree {
    name: string;
}

interface DegreeFormProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateSuccess: () => void;
}

const DegreeForm: React.FC<DegreeFormProps> = ({ isOpen, onClose, onCreateSuccess }) => {
    const [degreeName, setDegreeName] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const payload: PayloadCreateDegree = { name: degreeName };

        try {
            const response = await createResource<PayloadCreateDegree>("/degree", payload);

            if (response.status === 201) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Degree created successfully.',
                    confirmButtonText: 'Okay',
                    customClass: { confirmButton: 'green-button' }
                });
                setDegreeName('');
                onClose();
                onCreateSuccess();
            } else {
                await Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to create degree. Please try again.',
                    customClass: { confirmButton: 'error-button' }
                });
            }
        } catch {
            await Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred while creating the degree.',
                customClass: { confirmButton: 'error-button' }
            });
        }
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Create Degree</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="degreeName" style={{ position: 'relative' }}>
                        <Form.Control
                            type="text"
                            required
                            placeholder="Enter degree name"
                            value={degreeName}
                            onChange={(e) => setDegreeName(e.target.value)}
                            style={{ paddingLeft: '30px' }}
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-between">
                        <SubmitButton text_button="Submit" type="submit" />
                        <CancelButton text_button="Cancel" onPress={onClose} />
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default DegreeForm;
