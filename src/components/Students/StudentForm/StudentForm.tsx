import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './StudentForm.css';
import { createResource, readResource } from "../../../api/api.ts";
import Swal from "sweetalert2";

interface TeacherFormProps {
    isOpen: boolean;
    onClose: () => void;
}

interface PayloadCreateStudent {
    name: string;
    email: string;
    phone_number: string;
    degree_id: string;
    gpa: number;
}

interface ResponseStudentForm {
    "message": string,
    "username": string,
    "password": string
}

interface Degree {
    id: string;
    name: string;
}

interface GetDegreeResponse {
    degrees: Degree[];
}

const StudentForm: React.FC<TeacherFormProps> = ({ isOpen, onClose }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [gpa, setGpa] = useState<number | string>('');
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

        const payload: PayloadCreateStudent = {
            name: fullName,
            email: email,
            phone_number: phone,
            degree_id: degreeId,
            gpa: Number(gpa)
        };


        try {
            const response = await createResource<ResponseStudentForm>("/student", payload);
            if (response.status === 201) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    html: `
                        <strong>${response.data.message}</strong><br>
                        <span><strong>Username:</strong> ${response.data.username}</span><br>
                        <span><strong>Password:</strong> ${response.data.password}</span>
                    `,
                    confirmButtonText: 'Okay',
                    customClass: {
                        confirmButton: 'green-button'
                    }
                });
                setFullName('');
                setEmail('');
                setPhone('');
                setGpa('');
                setDegreeId('');
                onClose();
            } else {
                await Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to create teacher. Please try again.',
                    customClass: {
                        confirmButton: 'error-button'
                    }
                });
            }
        } catch {
            await Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred while creating the teacher.',
                customClass: {
                    confirmButton: 'error-button'
                }
            });
        }
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Create Teacher</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="fullName">
                        <Form.Control
                            type="text"
                            required
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Control
                            type="email"
                            required
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="phone">
                        <Form.Control
                            type="tel"
                            required
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="gpa">
                        <Form.Control
                            type="number"
                            required
                            placeholder="GPA"
                            value={gpa}
                            onChange={(e) => setGpa(e.target.value)}
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
                            {degrees.map(degree => (
                                <option key={degree.id} value={degree.id}>
                                    {degree.name}
                                </option>
                            ))}
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

export default StudentForm;
