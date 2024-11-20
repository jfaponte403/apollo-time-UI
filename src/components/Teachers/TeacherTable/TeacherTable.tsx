import { readResource } from "../../../api/api.ts";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Teacher } from "../../../interfaces/Teacher.ts";
import ModifyButton from "../../Buttons/ModifyButton.tsx";
import DeleteButton from "../../Buttons/DeleteButton.tsx";

interface TeacherTableProps {
    searchValue: string;
    isActive: boolean;
    refreshKey: boolean;
    onModify: (teacher: Teacher) => void;
    onDelete: (teacher: Teacher) => void;
}

interface Response {
    teachers: Teacher[];
}

const TeacherTable: React.FC<TeacherTableProps> = ({ searchValue, isActive, refreshKey, onModify, onDelete }) => {
    const [teachers, setTeachers] = useState<Teacher[] | undefined>(undefined);

    const getTeachers = () => {
        readResource<Response>("/teacher")
            .then((response) => {
                console.log(response);

                if (response.status === 200) {
                    setTeachers(response.data.teachers);
                } else {
                    setTeachers([]);
                }
            })
            .catch((error) => {
                console.log(error);
                setTeachers([]);
            });
    };

    useEffect(() => {
        getTeachers();
    }, [refreshKey]);

    const filteredTeachers = teachers?.filter((teacher) => {
        const matchesSearch = teacher.user_name.toLowerCase().includes(searchValue.toLowerCase());
        const matchesActive = isActive ? teacher.is_active : true;
        return matchesSearch && matchesActive;
    }) || [];

    return (
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
                        <ModifyButton text_button="Modify" onPress={() => onModify(teacher)} />
                        <DeleteButton text_button="Delete" onPress={() => onDelete(teacher)} />
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default TeacherTable;
