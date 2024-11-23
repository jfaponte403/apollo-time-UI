import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Swal from "sweetalert2";
import { deleteResource } from "../../../api/api.ts";
import { Subject } from "../../../interfaces/Subject.ts";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    subject: Subject;
    onDeleteSuccess: () => void;
}


const SubjectDelete: React.FC<Props> = ({ isOpen, onClose, subject, onDeleteSuccess }) => {

    const handleDelete = async () => {
        try {
            const response = await deleteResource(`/subject/${subject.id}`);

            if (response.status === 204) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `${subject.name} has been deleted successfully.`,
                    confirmButtonText: 'Okay',
                    customClass: {
                        confirmButton: 'green-button'
                    }
                });
                onDeleteSuccess();
                onClose();
            } else {
                throw new Error('Deletion failed');
            }
        } catch {
            await Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred while deleting the subject.',
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
                <p>Are you sure you want to delete <strong>{subject.name}</strong>? This action cannot be undone.</p>
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

export default SubjectDelete;
