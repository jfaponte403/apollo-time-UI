import { Form, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { updateResource } from "../../../api/api.ts";
import Swal from "sweetalert2";
import { Subject } from "../../../interfaces/Subject.ts";
import SubmitButton from "../../Buttons/SubmitButton.tsx";
import CancelButton from "../../Buttons/CancelButton.tsx";

interface Props {
    subject: Subject;
    isOpen: boolean;
    onClose: () => void;
    onModifySuccess: () => void;
}

interface PayloadModifySubject {
    name: string;
}


const SubjectModify: React.FC<Props> = ({ isOpen, onClose, subject, onModifySuccess }) => {
    const [formData, setFormData] = useState<PayloadModifySubject>({
        name: subject.name,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await updateResource<PayloadModifySubject>(`/subject/${subject.id}`, formData);
            if (response.status === 200) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Subject modified successfully.',
                    confirmButtonText: 'Okay',
                    customClass: {
                        confirmButton: 'green-button'
                    }
                });
                onModifySuccess();
                onClose();
            } else {
                await Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to modify subject. Please try again.',
                    customClass: {
                        confirmButton: 'error-button'
                    }
                });
            }
        } catch {
            await Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred while modifying the subject.',
                customClass: {
                    confirmButton: 'error-button'
                }
            });
        }
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Modify Subject</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter subject name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                        <SubmitButton
                            type="submit"
                            text_button="Submit"
                        />
                        <CancelButton
                            onPress={onClose}
                            text_button="Cancel"
                        />
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default SubjectModify;
