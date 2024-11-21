import { Container } from "react-bootstrap";
import React, { useState, useRef } from "react";
import SubjectForm from "../../../components/Subjects/SubjectForm/SubjectForm.tsx";
import SubjectTable from "../../../components/Subjects/SubjectTable/SubjectTable.tsx";
import SubjectDelete from "../../../components/Subjects/SubjectDelete/SubjectDelete.tsx";
import SubjectModify from "../../../components/Subjects/SubjectModify/SubjectModify.tsx";
import Title from "../../../components/Title/Title.tsx";
import CreateButton from "../../../components/Buttons/CreateButton.tsx";
import SearchInput from "../../../components/SearchInput/SearchInput.tsx";
import ActiveStatus from "../../../components/ActiveStatus/ActiveStatus.tsx";
import { Subject } from "../../../interfaces/Subject.ts";

const SubjectsAdminPage: React.FC = () => {
    const [showSubjectForm, setShowSubjectForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [selectSubject, setSelectSubject] = useState<Subject>({
        id: "",
        name: "",
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

    const fetchSubjectsRef = useRef<() => void>(() => {});

    const handleCreate = () => {
        setShowSubjectForm(true);
    };

    const handleModifySubject = (subject: Subject) => {
        setSelectSubject(subject);
        setShowModifyModal(true);
    };

    const handleDeleteSubject = (subject: Subject) => {
        setSelectSubject(subject);
        setShowDeleteModal(true);
    };

    const handleCloseSubjectForm = () => {
        setShowSubjectForm(false);
        fetchSubjectsRef.current();
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        fetchSubjectsRef.current();
    };

    const handleCloseModifyModal = () => {
        setShowModifyModal(false);
        fetchSubjectsRef.current();
    };

    return (
        <Container>
            <Title text="Subjects Management" />
            <CreateButton text_button="Add Subject" onPress={handleCreate} />
            <SearchInput value={searchValue} onChange={handleSearchChange} />
            <ActiveStatus isActive={isActive} onToggle={handleToggleActiveStatus} />

            <SubjectDelete
                isOpen={showDeleteModal}
                onClose={handleCloseDeleteModal}
                subject={selectSubject}
                onDeleteSuccess={handleTableRefresh}
            />
            <SubjectForm
                isOpen={showSubjectForm}
                onClose={handleCloseSubjectForm}
                onCreateSuccess={handleTableRefresh}
            />
            <SubjectModify
                isOpen={showModifyModal}
                onClose={handleCloseModifyModal}
                subject={selectSubject}
                onModifySuccess={handleTableRefresh}
            />
            <SubjectTable
                onModify={handleModifySubject}
                onDelete={handleDeleteSubject}
                searchValue={searchValue}
                isActive={isActive}
                refreshKey={shouldRefreshTable}
            />
        </Container>
    );
};

export default SubjectsAdminPage;
