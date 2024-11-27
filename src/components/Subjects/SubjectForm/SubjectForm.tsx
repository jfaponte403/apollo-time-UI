import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import './SubjectForm.css';
import { createResource } from "../../../api/api.ts";
import Swal from "sweetalert2";
import SubmitButton from "../../Buttons/SubmitButton.tsx";
import CancelButton from "../../Buttons/CancelButton.tsx";

interface SubjectFormProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateSuccess: () => void;
}

interface FormData {
    name: string;
}


const SubjectForm: React.FC<SubjectFormProps> = ({ isOpen, onClose, onCreateSuccess }) => {
    const [formData, setFormData] = useState<FormData>({
        name: ""
    });


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await createResource("/subject", formData);
            if (response.status === 201) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: "subject was created successful",
                    confirmButtonText: 'Okay',
                    customClass: {
                        confirmButton: 'green-button'
                    }
                });
                setFormData({name: ""});
                onCreateSuccess();
                onClose();
            } else {
                await Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to create subject. Please try again.',
                    customClass: {
                        confirmButton: 'error-button'
                    }
                });
            }
        } catch {
            await Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred while creating the subject.',
                customClass: {
                    confirmButton: 'error-button'
                }
            });
        }
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Create Subject</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Subject Name</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            placeholder="Enter Subject Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-between mt-3">
                        <SubmitButton
                            type="submit"
                            text_button="Submit"
                        />
                        <CancelButton
                            onPress={onClose}
                            text_button="Cancel"
                        />
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default SubjectForm;
