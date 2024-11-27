import { Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { readResource } from "../../../api/api.ts";
import { Subject } from "../../../interfaces/Subject.ts";
import ModifyButton from "../../Buttons/ModifyButton.tsx";
import DeleteButton from "../../Buttons/DeleteButton.tsx";

interface Props {
    searchValue: string;
    isActive: boolean;
    refreshKey: boolean;
    onModify: (value: Subject) => void;
    onDelete: (value: Subject) => void;
}


const SubjectTable: React.FC<Props> = ({ searchValue, isActive, refreshKey, onModify, onDelete }) => {
    const [subjects, setSubjects] = useState<Subject[]>([]);

    const fetchSubjects = async () => {
        try {
            const response = await readResource<{ subjects: Subject[] }>('/subject');
            if (response.status === 200) {
                setSubjects(response.data.subjects);
            }
        } catch (error) {
            console.error("Failed to fetch subjects:", error);
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, [refreshKey]);

    const filteredSubjects = subjects.filter(subject => {
        const matchesSearch = subject.name.toLowerCase().includes(searchValue.toLowerCase());
        const matchesActive = isActive ? subject.is_active : true;
        return matchesSearch && matchesActive;
    });

    return (
        <Table className="table-custom-subject" striped bordered hover>
            <thead>
            <tr>
                <th>Created at</th>
                <th>Active</th>
                <th>Name</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {filteredSubjects.map((subject) => (
                <tr key={subject.id}>
                    <td>{new Date(subject.created_at).toLocaleDateString()}</td>
                    <td>{subject.is_active ? 'Yes' : 'No'}</td>
                    <td>{subject.name}</td>
                    <td>
                        <ModifyButton text_button="Modify" onPress={() => onModify(subject)} />
                        <DeleteButton text_button="Delete" onPress={() => onDelete(subject)} />
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default SubjectTable;
