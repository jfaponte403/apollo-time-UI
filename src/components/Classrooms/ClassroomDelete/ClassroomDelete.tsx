import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import Swal from "sweetalert2";
import {deleteResource} from "../../../api/api.ts";
import {Classroom} from "../../../interfaces/Classroom.ts";

interface ClassroomDeleteProps {
    isOpen: boolean;
    onClose: () => void;
    classroom: Classroom;
    onCreateSuccess: () => void;
}

const ClassroomDelete: React.FC<ClassroomDeleteProps> = ({isOpen, onClose, classroom, onCreateSuccess}) => {

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
                <p>Are you sure you want to delete <strong>{classroom.name}</strong>? This action cannot be undone.</p>
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

export default ClassroomDelete;
