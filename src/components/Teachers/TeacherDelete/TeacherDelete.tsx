import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './TeacherDelete.css';
import Swal from "sweetalert2";
import { deleteResource } from "../../../api/api.ts";

interface TeacherDeleteProps {
    isOpen: boolean;
    onClose: () => void;
    teacherId: string;
    teacherName: string;
    onTeacherDeleted: (id: string) => void; // Added prop
}

const TeacherDelete: React.FC<TeacherDeleteProps> = ({ isOpen, onClose, teacherId, teacherName, onTeacherDeleted }) => {

    const handleDelete = async () => {
        try {
            const response = await deleteResource(`/teacher/${teacherId}`);

            if (response.status === 200) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `${teacherName} has been deleted successfully.`,
                    confirmButtonText: 'Okay',
                    customClass: {
                        confirmButton: 'green-button'
                    }
                });
                onTeacherDeleted(teacherId);
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
                <p>Are you sure you want to delete <strong>{teacherName}</strong>? This action cannot be undone.</p>
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
