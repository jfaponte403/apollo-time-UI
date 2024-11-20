import { Form, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { createResource, readResource } from "../../api/api.ts";
import Swal from "sweetalert2";
import SubmitButton from "../Buttons/SubmitButton.tsx";
import CancelButton from "../Buttons/CancelButton.tsx";
import { Classroom } from "../../interfaces/Classroom.ts";
import { Subject } from "../../interfaces/Subject.ts";
import { Degree } from "../../interfaces/Degree.ts";
import { Teacher } from "../../interfaces/Teacher.ts";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onCreateSuccess: () => void
}

interface CourseForm {
    classroom_id: string;
    subject_id: string;
    degrees_id: string;
    teacher_id: string;
    name: string;
}

interface Response {
    message: string;
}

interface ClassroomResponse {
    classrooms: Classroom[];
}

interface SubjectResponse {
    subjects: Subject[];
}

interface DegreeResponse {
    degrees: Degree[];
}

interface TeacherResponse {
    teachers: Teacher[];
}

const CourseCreate: React.FC<Props> = ({ isOpen, onClose, onCreateSuccess }) => {
    const [formData, setFormData] = useState<CourseForm>({
        classroom_id: "",
        subject_id: "",
        degrees_id: "",
        teacher_id: "",
        name: ""
    });

    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [degrees, setDegrees] = useState<Degree[]>([]);
    const [teachers, setTeachers] = useState<Teacher[]>([]);

    const handleInputChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    useEffect(() => {
        readResource<ClassroomResponse>("/classroom")
            .then((response) => {
                if (response.status === 200) {
                    const activeClassrooms = response.data.classrooms.filter(
                        (classroom) => classroom.is_active
                    );
                    setClassrooms(activeClassrooms);
                }
            })
            .catch((error) => console.log(error));

        readResource<SubjectResponse>("/subject")
            .then((response) => {
                if (response.status === 200) {
                    const activeSubjects = response.data.subjects.filter(
                        (subject) => subject.is_active
                    );
                    setSubjects(activeSubjects);
                }
            })
            .catch((error) => console.log(error));

        readResource<DegreeResponse>("/degree")
            .then((response) => {
                if (response.status === 200) {
                    const active = response.data.degrees.filter(
                        (item) => item.is_active
                    );
                    setDegrees(active);
                }
            })
            .catch((error) => console.log(error));

        readResource<TeacherResponse>("/teacher")
            .then((response) => {
                if (response.status === 200) {
                    const active = response.data.teachers.filter(
                        (item) => item.is_active
                    );
                    setTeachers(active);
                }
            })
            .catch((error) => console.log(error));
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {

            console.log(formData)
            console.log(formData)
            console.log(formData)
            console.log(formData)

            const response = await createResource<Response>("/course", formData);



            if (response.status === 201) {
                await Swal.fire({
                    icon: "success",
                    title: "Success!",
                    html: `<strong>${response.data.message}</strong><br>`,
                    confirmButtonText: "Okay",
                    customClass: {
                        confirmButton: "green-button"
                    }
                });
                onCreateSuccess();
                onClose();
            } else {
                await Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: "Failed to create course. Please try again.",
                    customClass: {
                        confirmButton: "error-button"
                    }
                });
            }
        } catch {
            await Swal.fire({
                icon: "error",
                title: "Error!",
                text: "An error occurred while creating the course.",
                customClass: {
                    confirmButton: "error-button"
                }
            });
        }
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Create Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="classroom_id">
                        <Form.Label>Classroom</Form.Label>
                        <Form.Control
                            as="select"
                            name="classroom_id"
                            required
                            value={formData.classroom_id}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Classroom</option>
                            {classrooms.map((classroom) => (
                                <option key={classroom.id} value={classroom.id}>
                                    {classroom.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="subject_id">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control
                            as="select"
                            name="subject_id"
                            required
                            value={formData.subject_id}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Subject</option>
                            {subjects.map((subject) => (
                                <option key={subject.id} value={subject.id}>
                                    {subject.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="degrees_id">
                        <Form.Label>Degree</Form.Label>
                        <Form.Control
                            as="select"
                            name="degrees_id"
                            required
                            value={formData.degrees_id}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Degree</option>
                            {degrees.map((degree) => (
                                <option key={degree.id} value={degree.id}>
                                    {degree.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="teacher_id">
                        <Form.Label>Teacher</Form.Label>
                        <Form.Control
                            as="select"
                            name="teacher_id"
                            required
                            value={formData.teacher_id}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Teacher</option>
                            {teachers.map((teacher) => (
                                <option key={teacher.teacher_id} value={teacher.teacher_id}>
                                    {teacher.user_name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="name">
                        <Form.Label>Course Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            required
                            placeholder="Course Name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-between mt-3">
                        <SubmitButton text_button="Submit" type="submit" />
                        <CancelButton text_button="Cancel" onPress={onClose} />
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CourseCreate;
