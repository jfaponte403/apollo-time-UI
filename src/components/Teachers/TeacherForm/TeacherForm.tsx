import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import './TeacherForm.css'; // Import your CSS file here
import {createResource} from "../../../api/api.ts";
import Swal from "sweetalert2";

interface TeacherFormProps {
    isOpen: boolean;
    onClose: () => void;
}

interface PayloadCreateTeacher {
    name: string;
    email: string;
    phone_number: string;
    specialization: string;
    salary: number;
}

interface ResponseTeacherForm {
    "message": string,
    "username": string,
    "password": string
}

const TeacherForm: React.FC<TeacherFormProps> = ({isOpen, onClose}) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [salary, setSalary] = useState<number | string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const payload: PayloadCreateTeacher = {
            name: fullName,
            email,
            phone_number: phone,
            specialization,
            salary: Number(salary)
        };

        try {
            const response = await createResource<ResponseTeacherForm>("/teacher", payload);

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
                setSpecialization('');
                setSalary('');
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
                    <Form.Group controlId="specialization">
                        <Form.Control
                            type="text"
                            required
                            placeholder="Specialization"
                            value={specialization}
                            onChange={(e) => setSpecialization(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="salary">
                        <Form.Control
                            type="number"
                            required
                            placeholder="Salary"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                        />
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

export default TeacherForm;
