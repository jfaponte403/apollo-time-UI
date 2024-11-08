import { Button, Form, Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { readResource } from "../../../api/api.ts";
import { Student } from "../../../interfaces/Student.ts";

interface Props {
    onModify: (student: Student) => void;
    onDelete: (student: Student) => void;
    setFetchStudentsRef: (fetchStudents: () => void) => void;
}

const StudentTable: React.FC<Props> = ({ onModify, onDelete, setFetchStudentsRef }) => {
    const [students, setStudents] = useState<Student[]>([]);
    const [showAllStudents, setShowAllStudents] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredStudents = students
        .filter(student => showAllStudents || student.is_active)
        .filter(student => student.user_name.toLowerCase().includes(searchTerm.toLowerCase()));

    const fetchStudents = async () => {
        try {
            const response = await readResource<{ students: Student[] }>('/student');
            if (response.status === 200) {
                setStudents(response.data.students);
            }
        } catch (error) {
            console.error("Failed to fetch students:", error);
        }
    };

    useEffect(() => {
        fetchStudents();
        setFetchStudentsRef(fetchStudents);
    }, []);

    const toggleShowAllStudents = () => {
        setShowAllStudents(!showAllStudents);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <Form.Control
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearchChange}
                className="mb-3"
            />
            <Button variant="secondary" onClick={toggleShowAllStudents} className="mb-3">
                {showAllStudents ? "Show Only Active" : "Show All"}
            </Button>
            <Table className="table-custom-degree" striped bordered hover>
                <thead>
                <tr>
                    <th>Status</th>
                    <th>Created at</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredStudents.map((student) => (
                    <tr key={student.student_id}>
                        <td>{student.is_active ? "Active" : "Inactive"}</td>
                        <td>{new Date(student.created_at).toLocaleDateString()}</td>
                        <td>{student.user_name}</td>
                        <td>
                            <Button
                                className="btn-custom-modify"
                                size="sm"
                                aria-label="Modify student"
                                onClick={() => onModify(student)}>
                                Modify
                            </Button>
                            <Button
                                className="btn-custom-delete"
                                size="sm"
                                aria-label="Delete student"
                                onClick={() => onDelete(student)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );
};

export default StudentTable;
