import React from 'react';
import {Modal,  Button} from 'react-bootstrap';
import Swal from "sweetalert2";
import {deleteResource} from "../../../api/api.ts";
import {Degree} from "../../../interfaces/Degree.ts";

interface DegreeDeleteProps {
    isOpen: boolean;
    onClose: () => void;
    degree: Degree;
    onCreateSuccess: () => void;
}

const DegreeDelete: React.FC<DegreeDeleteProps> = ({isOpen, onClose, degree, onCreateSuccess}) => {

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await deleteResource(`/degree/${degree.id}`);

            if (response.status === 204) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `${degree.name} has been deleted successfully.`,
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
                <p>Are you sure you want to delete <strong>{degree.name}</strong>? This action cannot be undone.</p>

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

export default DegreeDelete;
