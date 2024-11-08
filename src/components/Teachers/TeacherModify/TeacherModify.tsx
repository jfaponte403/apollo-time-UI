import { Button, Form, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { updateResource } from "../../../api/api.ts";
import Swal from "sweetalert2";

interface TeacherFormProps {
    id: string;
    isOpen: boolean;
    onClose: () => void;
}

interface PayloadModifyTeacher {
    salary?: number;
    specialization?: string;
    name?: string;
    email?: string;
    phone_number?: string;
    username?: string;
    password?: string;
}

const TeacherModify: React.FC<TeacherFormProps> = ({ isOpen, onClose, id }) => {
    const [formData, setFormData] = useState<PayloadModifyTeacher>({
        salary: 0,
        specialization: "",
        name: "",
        email: "",
        phone_number: "",
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
            const response = await updateResource<PayloadModifyTeacher>(`/teacher/${id}`, formData);
            if (response.status === 200) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Teacher modified successfully.',
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
                    text: 'Failed to modify teacher. Please try again.',
                    customClass: {
                        confirmButton: 'error-button'
                    }
                });
            }
        } catch {
            await Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred while modifying the teacher.',
                customClass: {
                    confirmButton: 'error-button'
                }
            });
        }
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Modify Teacher</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter teacher's name"
                            value={formData.name}
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
                    <Form.Group controlId="salary">
                        <Form.Control
                            type="number"
                            name="salary"
                            placeholder="Enter salary"
                            value={formData.salary}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="specialization">
                        <Form.Control
                            type="text"
                            name="specialization"
                            placeholder="Enter specialization"
                            value={formData.specialization}
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

export default TeacherModify;
