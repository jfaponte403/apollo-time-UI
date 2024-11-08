import { Button, Form, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { createResource } from "../../api/api.ts";
import Swal from "sweetalert2";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

interface CourseForm {
    classroom_id: string;
    subject_id: string;
    degrees_id: string;
    teacher_id: string;
    name: string;
}

interface Response {
    message: string;
}

const CreateCourseModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState<CourseForm>({
        classroom_id: "",
        subject_id: "",
        degrees_id: "",
        teacher_id: "",
        name: ""
    });

    const handleInputChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await createResource<Response>("/course", formData);

            if (response.status === 201) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    html: `<strong>${response.data.message}</strong><br>`,
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
                    text: 'Failed to create course. Please try again.',
                    customClass: {
                        confirmButton: 'error-button'
                    }
                });
            }
        } catch {
            await Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred while creating the course.',
                customClass: {
                    confirmButton: 'error-button'
                }
            });
        }
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Create Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="classroom_id">
                        <Form.Control
                            type="text"
                            name="classroom_id"
                            required
                            placeholder="Classroom ID"
                            value={formData.classroom_id}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="subject_id">
                        <Form.Control
                            type="text"
                            name="subject_id"
                            required
                            placeholder="Subject ID"
                            value={formData.subject_id}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="degrees_id">
                        <Form.Control
                            type="text"
                            name="degrees_id"
                            required
                            placeholder="Degree ID"
                            value={formData.degrees_id}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="teacher_id">
                        <Form.Control
                            type="text"
                            name="teacher_id"
                            required
                            placeholder="Teacher ID"
                            value={formData.teacher_id}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="name">
                        <Form.Control
                            type="text"
                            name="name"
                            required
                            placeholder="Course Name"
                            value={formData.name}
                            onChange={handleInputChange}
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
}

export default CreateCourseModal;
