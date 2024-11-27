import { readResource } from "../../../api/api.ts";
import { Classroom } from "../../../interfaces/Classroom.ts";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ModifyButton from "../../Buttons/ModifyButton.tsx";
import DeleteButton from "../../Buttons/DeleteButton.tsx";

interface ClassroomTableProps {
    searchValue: string;
    isActive: boolean;
    refreshKey: boolean;
    onModify: (value: Classroom) => void;
    onDelete: (value: Classroom) => void;
}

interface Response {
    classrooms: Classroom[];
}

const ClassroomTable: React.FC<ClassroomTableProps> = ({ searchValue, isActive, refreshKey, onModify, onDelete }) => {
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);

    const getClassrooms = () => {
        readResource<Response>('/classroom')
            .then(response => {
                if (response.status === 200) {
                    setClassrooms(response.data.classrooms);
                }
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        getClassrooms();
    }, [refreshKey]);

    const filteredClassrooms = classrooms.filter(classroom => {
        const matchesSearch = classroom.name.toLowerCase().includes(searchValue.toLowerCase());
        const matchesActive = isActive ? classroom.is_active : true;
        return matchesSearch && matchesActive;
    });

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Created At</th>
                <th>Active</th>
                <th>Name</th>
                <th>Type</th>
                <th>Capacity</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
                {filteredClassrooms.map(classroom => (
                    <tr key={classroom.id}>
                        <td>{new Date(classroom.created_at).toLocaleDateString()}</td>
                        <td>{classroom.is_active ? 'Yes' : 'No'}</td>
                        <td>{classroom.name}</td>
                        <td>{classroom.type}</td>
                        <td>{classroom.capacity}</td>
                        <td className="actions">
                            <ModifyButton text_button="Modify" onPress={() => onModify(classroom)}/>
                            <DeleteButton text_button="Delete" onPress={() => onDelete(classroom)}/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ClassroomTable;
