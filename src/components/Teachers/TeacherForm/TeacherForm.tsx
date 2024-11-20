import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import './TeacherForm.css';
import { createResource } from "../../../api/api.ts";
import Swal from "sweetalert2";
import SubmitButton from "../../Buttons/SubmitButton.tsx";
import CancelButton from "../../Buttons/CancelButton.tsx";

interface TeacherFormProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateSuccess: () => void;
}

interface PayloadCreateTeacher {
    name: string;
    email: string;
    phone_number: string;
    specialization: string;
    salary: number;
}

interface ResponseTeacherForm {
    message: string;
    username: string;
    password: string;
}

const TeacherForm: React.FC<TeacherFormProps> = ({ isOpen, onClose, onCreateSuccess }) => {
    const [formData, setFormData] = useState<PayloadCreateTeacher>({
        name: '',
        email: '',
        phone_number: '',
        specialization: '',
        salary: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'salary' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await createResource<ResponseTeacherForm>("/teacher", formData);

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
                        confirmButton: 'green-button',
                    },
                });

                setFormData({
                    name: '',
                    email: '',
                    phone_number: '',
                    specialization: '',
                    salary: 0,
                });

                onCreateSuccess();
                onClose();
            } else {
                await Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to create teacher. Please try again.',
                    customClass: {
                        confirmButton: 'error-button',
                    },
                });
            }
        } catch {
            await Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred while creating the teacher.',
                customClass: {
                    confirmButton: 'error-button',
                },
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
                    {['name', 'email', 'phone_number', 'specialization', 'salary'].map((field, index) => (
                        <Form.Group controlId={field} key={index}>
                            <Form.Control
                                type={field === 'salary' ? 'number' : 'text'}
                                name={field}
                                value={formData[field as keyof PayloadCreateTeacher]}
                                onChange={handleChange}
                                required
                                placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
                            />
                        </Form.Group>
                    ))}
                    <div className="d-flex justify-content-between mt-3">
                        <SubmitButton text_button="Submit" type="submit" />
                        <CancelButton text_button="Cancel" onPress={onClose} />
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default TeacherForm;
