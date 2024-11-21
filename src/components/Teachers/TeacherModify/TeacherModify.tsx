import React, {useState, useEffect} from "react";
import {Form, Modal} from "react-bootstrap";
import Swal from "sweetalert2";
import {updateResource} from "../../../api/api.ts";
import {Teacher} from "../../../interfaces/Teacher.ts";
import SubmitButton from "../../Buttons/SubmitButton.tsx";
import CancelButton from "../../Buttons/CancelButton.tsx";

interface TeacherFormProps {
    isOpen: boolean;
    onClose: () => void;
    teacher: Teacher;
    onModifySuccess: () => void;
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

const TeacherModify: React.FC<TeacherFormProps> = ({isOpen, onClose, teacher, onModifySuccess}) => {
    const [formData, setFormData] = useState<PayloadModifyTeacher>({
        salary: 0,
        specialization: "",
        name: "",
        email: "",
        phone_number: "",
        username: "",
        password: ""
    });

    useEffect(() => {
        if (isOpen) {
            setFormData({
                salary: teacher.salary,
                specialization: teacher.specialization,
                name: teacher.user_name,
                email: "",
                phone_number: "",
                username: "",
                password: ""
            });
        }
    }, [isOpen, teacher]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();


        try {
            const response = await updateResource<PayloadModifyTeacher>(`/teacher/${teacher.teacher_id}`, formData);

            if (response.status === 200) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Teacher modified successfully.',
                    confirmButtonText: 'Okay',
                    customClass: {confirmButton: 'green-button'}
                });
                onModifySuccess();
                onClose();
            } else {
                throw new Error('Failed to modify teacher');
            }
        } catch {
            await Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred while modifying the teacher.',
                customClass: {confirmButton: 'error-button'}
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
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter teacher's name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="phone_number">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone_number"
                            placeholder="Enter phone number"
                            value={formData.phone_number}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter password (leave blank to keep existing)"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="salary">
                        <Form.Label>Salary</Form.Label>
                        <Form.Control
                            type="number"
                            name="salary"
                            placeholder="Enter salary"
                            value={formData.salary}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="specialization">
                        <Form.Label>Specialization</Form.Label>
                        <Form.Control
                            type="text"
                            name="specialization"
                            placeholder="Enter specialization"
                            value={formData.specialization}
                            onChange={handleChange}
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

export default TeacherModify;
