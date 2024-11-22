import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './SubjectForm.css';
import { createResource, readResource } from "../../../api/api.ts";
import Swal from "sweetalert2";

interface SubjectFormProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateSuccess: () => void;
}

interface PayloadCreateSubject {
    name: string;
    degree_id: string;
}


interface ResponseSubjectForm {
    message: string;
}

interface Degree {
    id: string;
    name: string;
    is_active: string;
}

interface GetDegreeResponse {
    degrees: Degree[];
}

const SubjectForm: React.FC<SubjectFormProps> = ({ isOpen, onClose, onCreateSuccess }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [degrees, setDegrees] = useState<Degree[]>([]);
    const [degreeId, setDegreeId] = useState('');

    useEffect(() => {
        readResource<GetDegreeResponse>('/degree')
            .then(response => {
                setDegrees(response.data.degrees);
            });
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const payload: PayloadCreateSubject = {
            name,
            degree_id: degreeId,
        };

        try {
            const response = await createResource<ResponseSubjectForm>("/subject", payload);
            if (response.status === 201) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: response.data.message,
                    confirmButtonText: 'Okay',
                    customClass: {
                        confirmButton: 'green-button'
                    }
                });
                setName('');
                setDescription('');
                setDegreeId('');
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
                        <Form.Control
                            type="text"
                            required
                            placeholder="Subject Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="degree">
                        <Form.Control
                            as="select"
                            required
                            value={degreeId}
                            onChange={(e) => setDegreeId(e.target.value)}
                        >
                            <option value="">Select Degree</option>
                            {degrees.map(degree =>
                                degree.is_active && (
                                    <option key={degree.id} value={degree.id}>
                                        {degree.name}
                                    </option>
                                )
                            )}
                        </Form.Control>
                    </Form.Group>
                    <div className="d-flex justify-content-between mt-3">
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

export default SubjectForm;
