import React from 'react';
import { Modal } from 'react-bootstrap';
import Swal from "sweetalert2";
import { deleteResource } from "../../../api/api";
import { Subject } from "../../../interfaces/Subject";
import DeleteButton from "../../Buttons/DeleteButton";
import SubmitButton from "../../Buttons/SubmitButton";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    subject: Subject;
    onDeleteSuccess: () => void;
}

const SubjectDelete: React.FC<Props> = ({ isOpen, onClose, subject, onDeleteSuccess }) => {

    const handleDelete = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await deleteResource(`/subject/${subject.id}`);

            if (response.status === 204) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `${subject.name} has been deleted successfully.`,
                    confirmButtonText: 'Okay',
                    customClass: {
                        confirmButton: 'green-button',
                    },
                });
                onDeleteSuccess();
                onClose();
            }
        } catch {
            await Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred while deleting the subject.',
                customClass: {
                    confirmButton: 'error-button',
                },
            });
        }
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Are you sure you want to delete <strong>{subject.name}</strong>?
                    This action cannot be undone.
                </p>
                <form onSubmit={handleDelete}>
                    <div className="d-flex justify-content-end gap-2">
                        <SubmitButton
                            text_button="Delete"
                            type="submit"
                        />
                        <DeleteButton
                            text_button="Cancel"
                            onPress={onClose}
                        />
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default SubjectDelete;
