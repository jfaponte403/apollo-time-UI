import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Swal from "sweetalert2";
import { deleteResource } from "../../../api/api.ts";
import {Student} from "../../../interfaces/Student.ts";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    student: Student;
    onDeleteSuccess: () => void;
}

const StudentDelete: React.FC<Props> = ({ isOpen, onClose, student, onDeleteSuccess }) => {

    const handleDelete = async () => {
        try {
            const response = await deleteResource(`/student/${student.student_id}`);

            if (response.status === 204) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `${name} has been deleted successfully.`,
                    confirmButtonText: 'Okay',
                    customClass: {
                        confirmButton: 'green-button'
                    }
                });
                onDeleteSuccess()
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
                <p>Are you sure you want to delete <strong>{student.user_name}</strong>? This action cannot be undone.</p>
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

export default StudentDelete;
