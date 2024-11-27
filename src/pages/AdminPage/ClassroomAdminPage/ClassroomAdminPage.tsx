import { Container } from "react-bootstrap";
import React, { useState } from "react";
import Title from "../../../components/Title/Title.tsx";
import CreateButton from "../../../components/Buttons/CreateButton.tsx";
import ClassroomForm from "../../../components/Classrooms/ClassroomForm/ClassroomForm.tsx";
import SearchInput from "../../../components/SearchInput/SearchInput.tsx";
import ActiveStatus from "../../../components/ActiveStatus/ActiveStatus.tsx";
import ClassroomTable from "../../../components/Classrooms/ClassroomTable/ClassroomTable.tsx";
import ClassroomDelete from "../../../components/Classrooms/ClassroomDelete/ClassroomDelete.tsx";
import { Classroom } from "../../../interfaces/Classroom.ts";
import ClassroomModify from "../../../components/Classrooms/ClassroomModify/ClassroomModify.tsx";

const ClassroomAdminPage: React.FC = () => {
    const [selectClassroom, setSelectClassroom] = useState<Classroom>({
        id: "",
        name: "",
        type: "",
        capacity: 0,
        created_at: "",
        is_active: false,
    });

    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
    const [showModalModify, setShowModalModify] = useState<boolean>(false);

    const [searchValue, setSearchValue] = useState<string>("");
    const [isActive, setIsActive] = useState<boolean>(true);

    const [shouldRefreshTable, setShouldRefreshTable] = useState<boolean>(false);

    const handleCloseCreateModal = () => {
        setShowModalCreate(false);
    };

    const handleCloseDeleteModal = () => {
        setShowModalDelete(false);
    };

    const handleCloseModifyModal = () => {
        setShowModalModify(false);
    };

    const handleShowCreateModal = (value: boolean) => {
        setShowModalCreate(value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleToggleActiveStatus = () => {
        setIsActive((prev) => !prev);
    };

    const handleTableRefresh = () => {
        setShouldRefreshTable((prev) => !prev);
    };

    const handleShowModifyModal = (classroom: Classroom) => {
        setSelectClassroom(classroom);
        setShowModalModify(true);
    };

    const handleShowDeleteModal = (classroom: Classroom) => {
        setSelectClassroom(classroom);
        setShowModalDelete(true);
    };

    return (
        <Container>
            <Title text="Classrooms" />
            <CreateButton text_button="Create a new classroom" onPress={handleShowCreateModal} />

            <ClassroomForm
                isOpen={showModalCreate}
                onClose={handleCloseCreateModal}
                onCreateSuccess={handleTableRefresh}
            />

            <ClassroomDelete
                isOpen={showModalDelete}
                onClose={handleCloseDeleteModal}
                classroom={selectClassroom}
                onCreateSuccess={handleTableRefresh}
            />

            <ClassroomModify
                isOpen={showModalModify}
                onClose={handleCloseModifyModal}
                classroom={selectClassroom}
                onCreateSuccess={handleTableRefresh}
            />

            <SearchInput value={searchValue} onChange={handleSearchChange} />
            <ActiveStatus isActive={isActive} onToggle={handleToggleActiveStatus} />
            <ClassroomTable
                searchValue={searchValue}
                isActive={isActive}
                refreshKey={shouldRefreshTable}
                onModify={handleShowModifyModal}
                onDelete={handleShowDeleteModal}
            />
        </Container>
    );
};

export default ClassroomAdminPage;
