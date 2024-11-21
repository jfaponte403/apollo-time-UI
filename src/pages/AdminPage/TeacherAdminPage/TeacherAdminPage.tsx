import { Container } from "react-bootstrap";
import React, { useState } from "react";
import Title from "../../../components/Title/Title.tsx";
import CreateButton from "../../../components/Buttons/CreateButton.tsx";
import TeacherForm from "../../../components/Teachers/TeacherForm/TeacherForm.tsx";
import TeacherDelete from "../../../components/Teachers/TeacherDelete/TeacherDelete.tsx";
import TeacherModify from "../../../components/Teachers/TeacherModify/TeacherModify.tsx";
import SearchInput from "../../../components/SearchInput/SearchInput.tsx";
import ActiveStatus from "../../../components/ActiveStatus/ActiveStatus.tsx";
import TeacherTable from "../../../components/Teachers/TeacherTable/TeacherTable.tsx";
import { Teacher } from "../../../interfaces/Teacher.ts"; // Asegúrate de que la interfaz Teacher esté definida

const TeacherAdminPage: React.FC = () => {
    const [selectTeacher, setSelectTeacher] = useState<Teacher>({
        user_id: "",
        teacher_id: "",
        user_name: "",
        is_active: false,
        specialization: "",
        salary: 0
    });

    const [showTeacherForm, setShowTeacherForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);

    const [shouldRefreshTable, setShouldRefreshTable] = useState(false);

    const [searchValue, setSearchValue] = useState<string>("");
    const [isActive, setIsActive] = useState<boolean>(true);

    const handleCreate = () => {
        setShowTeacherForm(true);
    };

    const handleCloseTeacherForm = async () => {
        setShowTeacherForm(false);
    };

    const handleShowModifyModal = (teacher: Teacher) => {
        setSelectTeacher(teacher);
        setShowModifyModal(true);
    };

    const handleShowDeleteModal = (teacher: Teacher) => {
        setSelectTeacher(teacher);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = async () => {
        setShowDeleteModal(false);
    };

    const handleCloseModifyModal = async () => {
        setShowModifyModal(false);
    };

    const handleTableRefresh = () => {
        setShouldRefreshTable((prev) => !prev);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleToggleActiveStatus = () => {
        setIsActive((prev) => !prev);
    };

    return (
        <Container>
            <Title text="Teachers" />

            <CreateButton
                text_button="Create a new teacher"
                onPress={handleCreate}
            />

            <SearchInput value={searchValue} onChange={handleSearchChange} />

            <ActiveStatus isActive={isActive} onToggle={handleToggleActiveStatus} />

            <TeacherForm
                isOpen={showTeacherForm}
                onClose={handleCloseTeacherForm}
                onCreateSuccess={handleTableRefresh}
            />

            <TeacherDelete
                isOpen={showDeleteModal}
                onClose={handleCloseDeleteModal}
                teacher={selectTeacher}
                onDeleteSuccess={handleTableRefresh}
            />

            <TeacherModify
                isOpen={showModifyModal}
                onClose={handleCloseModifyModal}
                teacher={selectTeacher}
                onModifySuccess={handleTableRefresh}
            />

            <TeacherTable
                searchValue={searchValue}
                isActive={isActive}
                refreshKey={shouldRefreshTable}
                onModify={handleShowModifyModal}
                onDelete={handleShowDeleteModal}
            />
        </Container>
    );
};

export default TeacherAdminPage;
