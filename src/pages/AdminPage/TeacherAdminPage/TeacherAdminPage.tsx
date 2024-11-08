import { Button, Container, Table, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { readResource } from "../../../api/api.ts";
import './TeacherAdminPage.css';
import TeacherForm from "../../../components/Teachers/TeacherForm/TeacherForm.tsx";
import TeacherDelete from "../../../components/Teachers/TeacherDelete/TeacherDelete.tsx";
import TeacherModify from "../../../components/Teachers/TeacherModify/TeacherModify.tsx";

interface Teacher {
    user_id: string;
    teacher_id: string;
    user_name: string;
    specialization: string;
    is_active: boolean;
}

const TeacherAdminPage: React.FC = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showTeacherForm, setShowTeacherForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTeacherName, setSelectedTeacherName] = useState('');
    const [selectedTeacherId, setSelectedTeacherId] = useState('');
    const [showModifyModal, setShowModifyModal] = useState<boolean>(false);
    const [showAllTeachers, setShowAllTeachers] = useState(false);

    const fetchTeachers = async () => {
        try {
            const response = await readResource('/teacher');
            const teachersData = response.data as Teacher[];
            console.log(teachersData)
            setTeachers(teachersData);
        } catch (error) {
            console.error("Failed to fetch teachers:", error);
        }
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    const toggleShowAllTeachers = () => {
        setShowAllTeachers(!showAllTeachers);
    };

    const handleCreate = () => {
        setShowTeacherForm(true);
    };

    const handleCloseTeacherForm = async () => {
        setShowTeacherForm(false);
        await fetchTeachers();
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredTeachers = teachers
        .filter(teacher => showAllTeachers || teacher.is_active)
        .filter(teacher => teacher.user_name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleDelete = (id: string, name: string) => {
        setSelectedTeacherId(id);
        setSelectedTeacherName(name);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = async () => {
        setShowDeleteModal(false);
        await fetchTeachers();
    };

    const handleCloseModifyModal = async () => {
        setShowModifyModal(false);
        await fetchTeachers();
    };

    const handleTeacherDeleted = (id: string) => {
        setTeachers(prevTeachers => prevTeachers.filter(teacher => teacher.teacher_id !== id));
        handleCloseDeleteModal();
    };

    const handleModify = (id: string) => {
        setSelectedTeacherId(id);
        setShowModifyModal(true);
    };

    return (
        <Container className="container-custom mt-5">
            <h1>Teachers Management</h1>
            <Button className="btn-custom-create mb-3" onClick={handleCreate} aria-label="Create a new degree">
                Create Teacher
            </Button>
            <TeacherForm isOpen={showTeacherForm} onClose={handleCloseTeacherForm} />
            <TeacherDelete
                isOpen={showDeleteModal}
                onClose={handleCloseDeleteModal}
                teacherName={selectedTeacherName}
                teacherId={selectedTeacherId}
                onTeacherDeleted={handleTeacherDeleted}
            />
            <TeacherModify
                isOpen={showModifyModal}
                onClose={handleCloseModifyModal}
                id={selectedTeacherId}
            />
            <Form.Control
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearchChange}
                className="mb-3"
            />
            <Button variant="secondary" onClick={toggleShowAllTeachers} className="mb-3">
                {showAllTeachers ? "Show Only Active" : "Show All"}
            </Button>
            <Table className="table-custom" striped bordered hover>
                <thead>
                <tr>
                    <th>NAME</th>
                    <th>SPECIALIZATION</th>
                    <th>ACTIONS</th>
                </tr>
                </thead>
                <tbody>
                {filteredTeachers.map((teacher) => (
                    <tr key={teacher.teacher_id}>
                        <td>{teacher.user_name}</td>
                        <td>{teacher.specialization}</td>
                        <td>
                            <Button
                                className="btn-custom-delete"
                                size="sm"
                                onClick={() => handleDelete(teacher.teacher_id, teacher.user_name)}
                                aria-label="Delete teacher"
                            >
                                Delete
                            </Button>
                            {' '}
                            <Button
                                className="btn-custom-modify"
                                size="sm"
                                onClick={() => handleModify(teacher.teacher_id)}
                                aria-label="Modify teacher"
                            >
                                Modify
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default TeacherAdminPage;
