import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Swal from "sweetalert2";
import { deleteResource } from "../../../api/api.ts";
import './TeacherDelete.css';
import {Teacher} from "../../../interfaces/Teacher.ts";

interface TeacherDeleteProps {
    isOpen: boolean;
    onClose: () => void;
    teacher: Teacher;
    onDeleteSuccess: () => void;
}

const TeacherDelete: React.FC<TeacherDeleteProps> = ({ isOpen, onClose, teacher, onDeleteSuccess }) => {

    const handleDelete = async () => {
        try {
            const response = await deleteResource(`/teacher/${teacher.teacher_id}`);

            if (response.status === 204) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `${teacher.user_name} has been deleted successfully.`,
                    confirmButtonText: 'Okay',
                    customClass: {
                        confirmButton: 'green-button'
                    }
                });
                onDeleteSuccess(); // Actualizado para usar onDeleteSuccess
                onClose();
            } else {
                throw new Error('Deletion failed');
            }
        } catch {
            await Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred while deleting the teacher.',
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
                <p>Are you sure you want to delete <strong>{teacher.user_name}</strong>? This action cannot be undone.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TeacherDelete;
