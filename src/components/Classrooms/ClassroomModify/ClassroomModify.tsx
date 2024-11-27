import React, { useEffect, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { updateResource } from "../../../api/api.ts";
import Swal from "sweetalert2";
import { Classroom } from "../../../interfaces/Classroom.ts";
import SubmitButton from "../../Buttons/SubmitButton.tsx";
import CancelButton from "../../Buttons/CancelButton.tsx";

interface ClassroomModifyProps {
    isOpen: boolean;
    onClose: () => void;
    classroom: Classroom;
    onCreateSuccess: () => void;
}

interface PayloadModifyClassroom {
    name: string;
    type: string;
    capacity: number;
}

const ClassroomModify: React.FC<ClassroomModifyProps> = ({ isOpen, onClose, classroom, onCreateSuccess }) => {
    const [classroomName, setClassroomName] = useState('');
    const [classroomType, setClassroomType] = useState('');
    const [classroomCapacity, setClassroomCapacity] = useState<number>(0);

    useEffect(() => {
        if (isOpen) {
            setClassroomName(classroom.name);
            setClassroomType(classroom.type);
            setClassroomCapacity(classroom.capacity);
        }
    }, [isOpen, classroom]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const payload: PayloadModifyClassroom = {
            name: classroomName,
            type: classroomType,
            capacity: classroomCapacity,
        };

        try {
            const response = await updateResource<PayloadModifyClassroom>(`/classroom/${classroom.id}`, payload);

            if (response.status === 200) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Classroom modified successfully.',
                    confirmButtonText: 'Okay',
                    customClass: { confirmButton: 'green-button' }
                });
                onCreateSuccess();
                onClose();
            } else {
                await Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to modify classroom. Please try again.',
                    customClass: { confirmButton: 'error-button' }
                });
            }
        } catch {
            await Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred while modifying the classroom.',
                customClass: { confirmButton: 'error-button' }
            });
        }
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Modify Classroom</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="classroomName" className="mb-3">
                        <Form.Control
                            type="text"
                            required
                            placeholder="Enter classroom name"
                            value={classroomName}
                            onChange={(e) => setClassroomName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="classroomType" className="mb-3">
                        <Form.Control
                            type="text"
                            required
                            placeholder="Enter classroom type"
                            value={classroomType}
                            onChange={(e) => setClassroomType(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="classroomCapacity" className="mb-3">
                        <Form.Control
                            type="number"
                            required
                            placeholder="Enter classroom capacity"
                            value={classroomCapacity}
                            onChange={(e) => setClassroomCapacity(Number(e.target.value))}
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-between">
                        <SubmitButton text_button="Modify" type="submit" />
                        <CancelButton text_button="Cancel" onPress={onClose} />
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ClassroomModify;
