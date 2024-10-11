import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import DegreeForm from '../../../components/Degrees/DegreeForm/DegreeForm.tsx';
import './DegreeManagementPage.css'; // Import the CSS for additional styling

const DegreeManagementPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateDegree = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Container className="mt-5">
            <h1>Degree Management</h1>
            <Button className="btn-custom" onClick={handleCreateDegree} aria-label="Create a new degree">
                Create Degree
            </Button>
            <DegreeForm isOpen={isModalOpen} onClose={handleCloseModal} />
        </Container>
    );
};

export default DegreeManagementPage;
