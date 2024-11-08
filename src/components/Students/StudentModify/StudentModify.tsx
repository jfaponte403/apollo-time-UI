import { Button, Form, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { updateResource } from "../../../api/api.ts";
import Swal from "sweetalert2";
import { Student } from "../../../interfaces/Student.ts";

interface Props {
    student: Student;
    isOpen: boolean;
    onClose: () => void;
}

interface PayloadModifyStudent {
    user_id: string;
    degree_id: string;
    gpa: number;
    is_active: boolean;
    user_name: string;
    email: string;
    phone_number: string;
    username: string;
    password: string;
}

const StudentModify: React.FC<Props> = ({ isOpen, onClose, student }) => {
    const [formData, setFormData] = useState<PayloadModifyStudent>({
        user_id: student.user_id,
        degree_id: student.degree_id,
        gpa: student.gpa,
        is_active: student.is_active,
        user_name: student.user_name,
        email: student.email,
        phone_number: student.phone_number,
        username: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await updateResource<PayloadModifyStudent>(`/student/${student.student_id}`, formData);
            if (response.status === 200) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Student modified successfully.',
                    confirmButtonText: 'Okay',
                    customClass: {
                        confirmButton: 'green-button'
                    }
                });
                onClose();
            } else {
                await Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to modify student. Please try again.',
                    customClass: {
                        confirmButton: 'error-button'
                    }
                });
            }
        } catch {
            await Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred while modifying the student.',
                customClass: {
                    confirmButton: 'error-button'
                }
            });
        }
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Modify Student</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="user_name">
                        <Form.Control
                            type="text"
                            name="user_name"
                            placeholder="Enter student's name"
                            value={formData.user_name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="phone_number">
                        <Form.Control
                            type="text"
                            name="phone_number"
                            placeholder="Enter phone number"
                            value={formData.phone_number}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="username">
                        <Form.Control
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
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

export default StudentModify;
