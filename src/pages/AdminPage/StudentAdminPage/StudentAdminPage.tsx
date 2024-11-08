import { Button, Container } from "react-bootstrap";
import React, { useState, useRef } from "react";
import './StudentAdminPage.css';
import StudentForm from "../../../components/Students/StudentForm/StudentForm.tsx";
import StudentTable from "../../../components/Students/StudentTable/StudentTable.tsx";
import StudentDelete from "../../../components/Students/StudentDelete/StudentDelete.tsx";
import { Student } from "../../../interfaces/Student.ts";
import StudentModify from "../../../components/Students/StudentModify/StudentModify.tsx";

const StudentAdminPage: React.FC = () => {
    const [showStudentForm, setShowStudentForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [selectStudent, setSelectStudent] = useState<Student>({
        student_id: "",
        user_id: "",
        user_name: "",
        email: "",
        phone_number: "",
        degree_id: "",
        gpa: 0,
        is_active: true,
        created_at: ""
    });

    const fetchStudentsRef = useRef<() => void>(() => {});

    const handleCreate = () => {
        setShowStudentForm(true);
    };

    const handleModifyStudent = (student: Student) => {
        setSelectStudent(student);
        setShowModifyModal(true);
    };

    const handleDeleteStudent = (student: Student) => {
        setSelectStudent(student);
        setShowDeleteModal(true);
    };

    const handleCloseStudentForm = () => {
        setShowStudentForm(false);
        fetchStudentsRef.current();
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        fetchStudentsRef.current();
    };

    const handleCloseModifyModal = () => {
        setShowModifyModal(false);
        fetchStudentsRef.current();
    };

    return (
        <Container className="container-custom mt-5">
            <h1>Students Management</h1>
            <Button className="btn-custom-create mb-3" onClick={handleCreate} aria-label="Create a new student">
                Create Student
            </Button>
            <StudentDelete
                isOpen={showDeleteModal}
                onClose={handleCloseDeleteModal}
                student={selectStudent}
            />
            <StudentForm isOpen={showStudentForm} onClose={handleCloseStudentForm} />
            <StudentModify
                isOpen={showModifyModal}
                onClose={handleCloseModifyModal}
                student={selectStudent}
            />
            <StudentTable
                onModify={handleModifyStudent}
                onDelete={handleDeleteStudent}
                setFetchStudentsRef={(fetchStudents) => fetchStudentsRef.current = fetchStudents}
            />
        </Container>
    );
};

export default StudentAdminPage;
