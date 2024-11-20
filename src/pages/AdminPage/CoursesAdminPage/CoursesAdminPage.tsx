import { Container } from "react-bootstrap";
import React, { useState } from "react";
import Title from "../../../components/Title/Title.tsx";
import CreateButton from "../../../components/Buttons/CreateButton.tsx";
import CourseCreate from "../../../components/Courses/CourseCreate.tsx";
import CoursesTable from "../../../components/Courses/CoursesTable.tsx";
import SearchInput from "../../../components/SearchInput/SearchInput.tsx";
import ActiveStatus from "../../../components/ActiveStatus/ActiveStatus.tsx";
import {Course} from "../../../interfaces/Course.ts";
import CourseDelete from "../../../components/Courses/CourseDelete.tsx";
import CourseModify from "../../../components/Courses/CourseModify.tsx";



const CoursesAdminPage: React.FC = () => {
    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [isActive, setIsActive] = useState<boolean>(true);

    const [shouldRefreshTable, setShouldRefreshTable] = useState<boolean>(false);

    const [selectCourse, setSelectCourse] = useState<Course>({
        id: "",
        classroom_id: "",
        subject_id: "",
        degrees_id: "",
        teacher_id: "",
        name: "",
        is_active: false,
        created_at: ""
    });

    const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
    const [showModalModify, setShowModalModify] = useState<boolean>(false);

    const handleTableRefresh = () => {
        setShouldRefreshTable((prev) => !prev);
    };

    const handleCloseCreateModal = () => {
        setShowModalCreate(false);
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

    const handleShowModifyModal = (course: Course) => {
        setSelectCourse(course)
        setShowModalModify(true)
    }

    const handleShowDeleteModal = (course: Course) => {
        setSelectCourse(course)
        setShowModalDelete(true)
    }

    const handleCloseDeleteModal = () => {
        setShowModalDelete(false);
    };

    const handleCloseModifyModal = () => {
        setShowModalModify(false);
    };


    return (
        <Container>
            <Title text="Courses Admin Page" />
            <CreateButton text_button="Create a new course" onPress={handleShowCreateModal} />
            <CourseCreate
                isOpen={showModalCreate}
                onClose={handleCloseCreateModal}
                onCreateSuccess={handleTableRefresh}
            />

            <CourseDelete
                isOpen={showModalDelete}
                onClose={handleCloseDeleteModal}
                course={selectCourse}
                onCreateSuccess={handleTableRefresh}
            />

            <CourseModify
                isOpen={showModalModify}
                onClose={handleCloseModifyModal}
                course={selectCourse}
                onCreateSuccess={handleTableRefresh}
            />

            <SearchInput
                value={searchValue}
                onChange={handleSearchChange}
            />
            <ActiveStatus
                isActive={isActive}
                onToggle={handleToggleActiveStatus}
            />
            <CoursesTable
                searchQuery={searchValue}
                isActive={isActive}
                refreshKey={shouldRefreshTable}
                onModify={handleShowModifyModal}
                onDelete={handleShowDeleteModal}
            />
        </Container>
    );
};

export default CoursesAdminPage;
