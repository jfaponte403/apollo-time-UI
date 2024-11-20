import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import Swal from "sweetalert2";
import CancelButton from "../Buttons/CancelButton.tsx";
import SubmitButton from "../Buttons/SubmitButton.tsx";
import {deleteResource} from "../../api/api.ts";
import {Course} from "../../interfaces/Course.ts";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    course: Course;
    onCreateSuccess: () => void;
}

const CourseDelete: React.FC<Props> = ({ isOpen, onClose, course, onCreateSuccess }) => {

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await deleteResource(`/course/${course.id}`);

            if (response.status === 200) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `${course.name} has been deleted successfully.`,
                    confirmButtonText: 'Okay',
                    customClass: {
                        confirmButton: 'green-button'
                    }
                });
                onCreateSuccess();
                onClose();
            } else {
                throw new Error('Deletion failed');
            }
        } catch {
            await Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred while deleting the degree.',
                customClass: {
                    confirmButton: 'error-button'
                }
            });
        }
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleDelete}>
                    <p>Are you sure you want to delete <strong>{course.name}</strong>? This action cannot be undone.</p>
                    <SubmitButton
                        text_button="Delete"
                        type="submit"
                    />
                    <CancelButton
                        text_button="Cancel"
                        onPress={onClose}
                    />
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CourseDelete;
