import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateResource } from "../../../api/api.ts";
import Swal from "sweetalert2";

interface DegreeFormProps {
    id: string;
    isOpen: boolean;
    onClose: () => void;
    currentDegreeName: string; // New prop to pass the current degree name
}

interface PayloadModifyDegree {
    name: string;
}

const ModifyDegree: React.FC<DegreeFormProps> = ({ isOpen, onClose, id, currentDegreeName }) => {
    const [degreeName, setDegreeName] = useState('');

    useEffect(() => {
        if (isOpen) {
            setDegreeName(currentDegreeName); // Load current degree name when modal opens
        }
    }, [isOpen, currentDegreeName]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const payload: PayloadModifyDegree = {
            name: degreeName,
        };

        try {
            const response = await updateResource<PayloadModifyDegree>(`/degree/${id}`, payload);

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
                setDegreeName(''); // Clear the input after successful submission
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
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Button variant="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ModifyDegree;
