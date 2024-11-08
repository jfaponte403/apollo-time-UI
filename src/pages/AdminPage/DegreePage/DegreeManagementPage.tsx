import React, { useEffect, useState } from 'react';
import { Container, Button, Table, Form } from 'react-bootstrap';
import DegreeForm from '../../../components/Degrees/DegreeForm/DegreeForm.tsx';
import "./DegreeManagementPage.css";
import { readResource } from '../../../api/api.ts';
import DegreeDelete from "../../../components/Degrees/DegreeDelete/DegreeDelete.tsx";
import ModifyDegree from "../../../components/Degrees/DegreeModify/ModifyDegree.tsx";

interface Degree {
    id: string;
    name: string;
    create_at: string; // Date of creation
    is_active: boolean;
}

const DegreeManagementPage: React.FC = () => {
    const [degrees, setDegrees] = useState<Degree[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedDegreeName, setSelectedDegreeName] = useState('');
    const [selectedDegreeId, setSelectedDegreeId] = useState('');
    const [showAllDegrees, setShowAllDegrees] = useState(false);

    useEffect(() => {
        fetchDegrees();
    }, []);

    const fetchDegrees = async () => {
        try {
            const response = await readResource<{ degrees: Degree[] }>('/degree');
            if (response.status === 200) {
                setDegrees(response.data.degrees);
            }
        } catch (error) {
            console.error("Failed to fetch degrees:", error);
        }
    };

    const handleCreateDegree = () => {
        setIsCreateModalOpen(true);
    };

    const handleCloseCreateModal = async () => {
        setIsCreateModalOpen(false);
        await fetchDegrees();
    };

    const handleCloseModifyModal = async () => {
        setIsModifyModalOpen(false);
        await fetchDegrees();
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const toggleShowAllDegrees = () => {
        setShowAllDegrees(!showAllDegrees);
    };

    const filteredDegrees = degrees.filter(degree =>
        degree.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (showAllDegrees || degree.is_active)
    );

    const handleDelete = (id: string, name: string) => {
        setSelectedDegreeId(id);
        setSelectedDegreeName(name);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleModify = (id: string, name: string) => {
        setSelectedDegreeId(id);
        setSelectedDegreeName(name);
        setIsModifyModalOpen(true);
    };

    const handleDegreeDeleted = async () => {
        await fetchDegrees();
        handleCloseDeleteModal();
    };

    return (
        <Container className="mt-5">
            <h1>Degree Management</h1>
            <Button className="btn-custom-create mb-3 btn btn-primary" onClick={handleCreateDegree} aria-label="Create a new degree">
                Create Degree
            </Button>
            <DegreeForm isOpen={isCreateModalOpen} onClose={handleCloseCreateModal} />
            <ModifyDegree
                isOpen={isModifyModalOpen}
                onClose={handleCloseModifyModal}
                id={selectedDegreeId}
                currentDegreeName={selectedDegreeName}
            />
            <DegreeDelete
                isOpen={showDeleteModal}
                onClose={handleCloseDeleteModal}
                degreeId={selectedDegreeId}
                degreeName={selectedDegreeName}
                onDegreeDeleted={handleDegreeDeleted}
            />
            <Form.Control
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearchChange}
                className="mb-3"
            />
            <Button variant="secondary" onClick={toggleShowAllDegrees} className="mb-3">
                {showAllDegrees ? "Show Only Active" : "Show All"}
            </Button>
            <Table className="table-custom-degree" striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Creation Date</th>
                    <th>Active Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredDegrees.map((degree) => (
                    <tr key={degree.id} className={!degree.is_active ? 'inactive' : ''}>
                        <td>{degree.name}</td>
                        <td>{new Date(degree.create_at).toLocaleDateString()}</td>
                        <td>{degree.is_active ? "Active" : "Inactive"}</td>
                        <td>
                            <Button
                                className="btn-custom-delete"
                                size="sm"
                                onClick={() => handleDelete(degree.id, degree.name)}
                                aria-label="Delete degree"
                            >
                                Delete
                            </Button>{' '}
                            <Button
                                className="btn-custom-modify"
                                size="sm"
                                onClick={() => handleModify(degree.id, degree.name)}
                                aria-label="Modify degree"
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

export default DegreeManagementPage;
