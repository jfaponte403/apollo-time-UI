import { Container } from "react-bootstrap";
import React, { useState, useRef } from "react";
import StudentForm from "../../../components/Students/StudentForm/StudentForm.tsx";
import StudentTable from "../../../components/Students/StudentTable/StudentTable.tsx";
import StudentDelete from "../../../components/Students/StudentDelete/StudentDelete.tsx";
import { Student } from "../../../interfaces/Student.ts";
import StudentModify from "../../../components/Students/StudentModify/StudentModify.tsx";
import Title from "../../../components/Title/Title.tsx";
import CreateButton from "../../../components/Buttons/CreateButton.tsx";
import SearchInput from "../../../components/SearchInput/SearchInput.tsx";
import ActiveStatus from "../../../components/ActiveStatus/ActiveStatus.tsx";

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

    const [searchValue, setSearchValue] = useState<string>("");
    const [isActive, setIsActive] = useState<boolean>(true);

    const [shouldRefreshTable, setShouldRefreshTable] = useState<boolean>(false);

    const handleTableRefresh = () => {
        setShouldRefreshTable((prev) => !prev);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleToggleActiveStatus = () => {
        setIsActive((prev) => !prev);
    };

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
        <Container>

            <Title text="Students Management" />
            <CreateButton text_button="Add Student" onPress={handleCreate} />
            <SearchInput value={searchValue} onChange={handleSearchChange} />
            <ActiveStatus isActive={isActive} onToggle={handleToggleActiveStatus} />

            <StudentDelete
                isOpen={showDeleteModal}
                onClose={handleCloseDeleteModal}
                student={selectStudent}
                onDeleteSuccess={handleTableRefresh}
            />
            <StudentForm isOpen={showStudentForm} onClose={handleCloseStudentForm} onCreateSuccess={handleTableRefresh} />
            <StudentModify
                isOpen={showModifyModal}
                onClose={handleCloseModifyModal}
                student={selectStudent}
                onModifySuccess={handleTableRefresh}
            />
            <StudentTable
                onModify={handleModifyStudent}
                onDelete={handleDeleteStudent}
                searchValue={searchValue}
                isActive={isActive}
                refreshKey={shouldRefreshTable}
            />
        </Container>
    );
};

export default StudentAdminPage;
