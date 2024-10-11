import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import './DegreeForm.css';
import {createResource} from "../../../api/api.ts"; // Ensure you import the CSS here as well
import Swal from "sweetalert2";

interface DegreeFormProps {
    isOpen: boolean;
    onClose: () => void;
}

interface PayloadCreateDegree {
    name: string;
}

const DegreeForm: React.FC<DegreeFormProps> = ({isOpen, onClose}) => {
    const [degreeName, setDegreeName] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const payload: PayloadCreateDegree = {
            name: degreeName,
        };

        try {
            const response = await createResource<PayloadCreateDegree>("/degree", payload);

            if (response.status === 201) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Degree created successfully.',
                    confirmButtonText: 'Okay', // Optional: Change button text
                    customClass: {
                        confirmButton: 'green-button' // Use the custom class here
                    }
                });
                setDegreeName(''); // Clear the input after successful submission
                onClose(); // Close the modal
            } else {
                await Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to create degree. Please try again.',
                    customClass: {
                        confirmButton: 'error-button' // Use the custom class here
                    }
                });
            }
        } catch {
            await Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred while creating the degree.',
                customClass: {
                    confirmButton: 'error-button' // Use the custom class here
                }
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
                    <Form.Group controlId="degreeName" style={{position: 'relative'}}>
                        <Form.Control
                            type="text"
                            required
                            placeholder="Enter degree name"
                            value={degreeName}
                            onChange={(e) => setDegreeName(e.target.value)} // Handle input change
                            style={{paddingLeft: '30px'}} // Add space for the icon
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

export default DegreeForm;
