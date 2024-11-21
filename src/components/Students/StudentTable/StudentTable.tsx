import { Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { readResource } from "../../../api/api.ts";
import { Student } from "../../../interfaces/Student.ts";
import ModifyButton from "../../Buttons/ModifyButton.tsx";
import DeleteButton from "../../Buttons/DeleteButton.tsx";

interface Props {
    searchValue: string;
    isActive: boolean;
    refreshKey: boolean;
    onModify: (value: Student) => void;
    onDelete: (value: Student) => void;
}

const StudentTable: React.FC<Props> = ({ searchValue, isActive, refreshKey, onModify, onDelete }) => {
    const [students, setStudents] = useState<Student[]>([]);

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
    }, [refreshKey]);

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.user_name.toLowerCase().includes(searchValue.toLowerCase());
        const matchesActive = isActive ? student.is_active : true;
        return matchesSearch && matchesActive;
    });

    return (
        <Table className="table-custom-degree" striped bordered hover>
            <thead>
            <tr>
                <th>Created at</th>
                <th>Status</th>
                <th>Name</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {filteredStudents.map((student) => (
                <tr key={student.student_id}>
                    <td>{new Date(student.created_at).toLocaleDateString()}</td>
                    <td>{student.is_active ? "Active" : "Inactive"}</td>
                    <td>{student.user_name}</td>
                    <td>
                        <ModifyButton text_button="Modify" onPress={() => onModify(student)} />
                        <DeleteButton text_button="Delete" onPress={() => onDelete(student)} />
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default StudentTable;
