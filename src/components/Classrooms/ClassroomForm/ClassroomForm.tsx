import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import './ClassroomForm.css';
import { createResource } from "../../../api/api.ts";
import Swal from "sweetalert2";
import SubmitButton from "../../Buttons/SubmitButton.tsx";
import CancelButton from "../../Buttons/CancelButton.tsx";

interface ClassroomFormProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateSuccess: () => void;
}

interface PayloadCreateClassroom {
    name: string;
    type: string;
    capacity: number;
}

const ClassroomForm: React.FC<ClassroomFormProps> = ({ isOpen, onClose, onCreateSuccess }) => {
    const [classroomName, setClassroomName] = useState('');
    const [classroomType, setClassroomType] = useState('');
    const [classroomCapacity, setClassroomCapacity] = useState<number>(0);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const payload: PayloadCreateClassroom = {
            name: classroomName,
            type: classroomType,
            capacity: classroomCapacity,
        };

        try {
            const response = await createResource<PayloadCreateClassroom>("/classroom", payload);

            if (response.status === 201) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Classroom created successfully.',
                    confirmButtonText: 'Okay',
                    customClass: { confirmButton: 'green-button' }
                });
                setClassroomName('');
                setClassroomType('');
                setClassroomCapacity(0);
                onClose();
                onCreateSuccess();
            } else {
                await Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to create classroom. Please try again.',
                    customClass: { confirmButton: 'error-button' }
                });
            }
        } catch {
            await Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred while creating the classroom.',
                customClass: { confirmButton: 'error-button' }
            });
        }
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Create Classroom</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="classroomName" style={{ position: 'relative' }}>
                        <Form.Control
                            type="text"
                            required
                            placeholder="Enter classroom name"
                            value={classroomName}
                            onChange={(e) => setClassroomName(e.target.value)}
                            style={{ paddingLeft: '30px' }}
                        />
                    </Form.Group>
                    <Form.Group controlId="classroomType" style={{ marginTop: '10px' }}>
                        <Form.Control
                            type="text"
                            required
                            placeholder="Enter classroom type"
                            value={classroomType}
                            onChange={(e) => setClassroomType(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="classroomCapacity" style={{ marginTop: '10px' }}>
                        <Form.Control
                            type="number"
                            required
                            placeholder="Enter classroom capacity"
                            value={classroomCapacity}
                            onChange={(e) => setClassroomCapacity(Number(e.target.value))}
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-between" style={{ marginTop: '15px' }}>
                        <SubmitButton text_button="Submit" type="submit" />
                        <CancelButton text_button="Cancel" onPress={onClose} />
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ClassroomForm;
