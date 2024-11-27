import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import Swal from "sweetalert2";
import { deleteResource } from "../../../api/api.ts";
import { Classroom } from "../../../interfaces/Classroom.ts";
import SubmitButton from "../../Buttons/SubmitButton.tsx";
import CancelButton from "../../Buttons/CancelButton.tsx";

interface ClassroomDeleteProps {
    isOpen: boolean;
    onClose: () => void;
    classroom: Classroom;
    onCreateSuccess: () => void;
}

const ClassroomDelete: React.FC<ClassroomDeleteProps> = ({ isOpen, onClose, classroom, onCreateSuccess }) => {

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await deleteResource(`/classroom/${classroom.id}`);

            if (response.status === 204) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `${classroom.name} has been deleted successfully.`,
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
                text: 'An error occurred while deleting the classroom.',
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
                    <p>Are you sure you want to delete <strong>{classroom.name}</strong>? This action cannot be undone.</p>
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

export default ClassroomDelete;
