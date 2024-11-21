import React, { useEffect, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { updateResource } from "../../../api/api.ts";
import Swal from "sweetalert2";
import {Degree} from "../../../interfaces/Degree.ts";
import SubmitButton from "../../Buttons/SubmitButton.tsx";
import CancelButton from "../../Buttons/CancelButton.tsx";

interface DegreeFormProps {
    isOpen: boolean;
    onClose: () => void;
    degree: Degree;
    onCreateSuccess: () => void;
}

interface PayloadModifyDegree {
    name: string;
}

const DegreeModify: React.FC<DegreeFormProps> = ({ isOpen, onClose, degree, onCreateSuccess }) => {
    const [degreeName, setDegreeName] = useState('');

    useEffect(() => {
        if (isOpen) {
            setDegreeName(degree.name); // Load current degree name when modal opens
        }
    }, [isOpen, degree.name]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const payload: PayloadModifyDegree = {
            name: degreeName,
        };

        try {
            const response = await updateResource<PayloadModifyDegree>(`/degree/${degree.id}`, payload);

            if (response.status === 200) { // Usually, updates return a 200 status
                await Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Degree modified successfully.',
                    confirmButtonText: 'Okay',
                    customClass: {
                        confirmButton: 'green-button'
                    }
                });
                setDegreeName('');
                onCreateSuccess();// Clear the input after successful submission
                onClose(); // Close the modal
            } else {
                await Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to modify degree. Please try again.',
                    customClass: {
                        confirmButton: 'error-button'
                    }
                });
            }
        } catch {
            await Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred while modifying the degree.',
                customClass: {
                    confirmButton: 'error-button'
                }
            });
        }
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Modify Degree</Modal.Title> {/* Changed title to "Modify Degree" */}
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="degreeName" style={{ position: 'relative' }}>
                        <Form.Control
                            type="text"
                            required
                            placeholder="Enter degree name"
                            value={degreeName}
                            onChange={(e) => setDegreeName(e.target.value)} // Handle input change
                            style={{ paddingLeft: '30px' }} // Add space for the icon
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-between">
                        <SubmitButton
                            text_button="Modify"
                            type="submit"
                        />
                        <CancelButton
                            text_button="Cancel"
                            onPress={onClose}
                        />
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default DegreeModify;
