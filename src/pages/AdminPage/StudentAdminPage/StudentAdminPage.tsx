import {Button, Container} from "react-bootstrap";
import React, {useState} from "react";
import './StudentAdminPage.css';
import StudentForm from "../../../components/Students/StudentForm/StudentForm.tsx";


const StudentAdminPage: React.FC = () => {
    const [showStudentForm, setShowStudentForm] = useState(false);


    const handleCreate = () => {
        setShowStudentForm(true);
    };

    const handleCloseStudentForm = () => {
        setShowStudentForm(false);
    };


    return (
        <Container className="container-custom mt-5">
            <h1>Students Management</h1>
            <Button className="btn-custom-create mb-3" onClick={handleCreate} aria-label="Create a new degree">
                Create Student
            </Button>
            <StudentForm isOpen={showStudentForm} onClose={handleCloseStudentForm}/>
        </Container>
    );
};

export default StudentAdminPage;
