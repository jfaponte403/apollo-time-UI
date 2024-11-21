

import {readResource} from "../../../api/api.ts";
import {Degree} from "../../../interfaces/Degree.ts";
import {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import ModifyButton from "../../Buttons/ModifyButton.tsx";
import DeleteButton from "../../Buttons/DeleteButton.tsx";

interface DegreeTableProps {
    searchValue: string;
    isActive: boolean;
    refreshKey: boolean;
    onModify: (value: Degree) => void;
    onDelete: (value: Degree) => void;
}


interface Response {
    degrees: Degree[];
}

const DegreeTable: React.FC<DegreeTableProps> = ({ searchValue, isActive, refreshKey, onModify, onDelete }) => {
    const [degrees, setDegrees] = useState<Degree[]>([]);

    const getDegrees = () => {
        readResource<Response>('/degree')
            .then(response => {
                if (response.status === 200) {
                    setDegrees(response.data.degrees);
                }
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        getDegrees();
    }, [refreshKey]);

    const filteredDegrees = degrees.filter(degree => {
        const matchesSearch = degree.name.toLowerCase().includes(searchValue.toLowerCase());
        const matchesActive = isActive ? degree.is_active : true;
        return matchesSearch && matchesActive;
    });

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Name</th>
                <th>Created At</th>
                <th>Active</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {filteredDegrees.map(degree => (
                <tr key={degree.id}>
                    <td>{degree.name}</td>
                    <td>{new Date(degree.create_at).toLocaleDateString()}</td>
                    <td>{degree.is_active ? 'Yes' : 'No'}</td>
                    <td className="actions">
                        <ModifyButton text_button="Modify" onPress={() => onModify(degree)} />
                        <DeleteButton text_button="Delete" onPress={() => onDelete(degree)} />
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default DegreeTable;
