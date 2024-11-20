import {Container} from "react-bootstrap";
import React, {useState} from "react";
import Title from "../../../components/Title/Title.tsx";
import CreateButton from "../../../components/Buttons/CreateButton.tsx";
import DegreeForm from "../../../components/Degrees/DegreeForm/DegreeForm.tsx";
import SearchInput from "../../../components/SearchInput/SearchInput.tsx";
import ActiveStatus from "../../../components/ActiveStatus/ActiveStatus.tsx";
import DegreeTable from "../../../components/Degrees/DegreeTable/DegreeTable.tsx";
import DegreeDelete from "../../../components/Degrees/DegreeDelete/DegreeDelete.tsx";
import {Degree} from "../../../interfaces/Degree.ts";
import DegreeModify from "../../../components/Degrees/DegreeModify/DegreeModify.tsx";

const DegreeAdminPage: React.FC = () => {
    const [selectDegree, setSelectDegree] = useState<Degree>({
        id: "",
        name: "",
        create_at: "",
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

    const handleShowModifyModal = (degree: Degree) => {
        setSelectDegree(degree)
        setShowModalModify(true)
    }

    const handleShowDeleteModal = (degree: Degree) => {
        setSelectDegree(degree)
        setShowModalDelete(true)
    }

    return (
        <Container>
            <Title text="Degrees" />
            <CreateButton text_button="Create a new degree" onPress={handleShowCreateModal} />

            <DegreeForm
                isOpen={showModalCreate}
                onClose={handleCloseCreateModal}
                onCreateSuccess={handleTableRefresh}
            />

            <DegreeDelete
                isOpen={showModalDelete}
                onClose={handleCloseDeleteModal}
                degree={selectDegree}
                onCreateSuccess={handleTableRefresh}
            />

            <DegreeModify
                isOpen={showModalModify}
                onClose={handleCloseModifyModal}
                degree={selectDegree}
                onCreateSuccess={handleTableRefresh}
            />

            <SearchInput value={searchValue} onChange={handleSearchChange} />
            <ActiveStatus isActive={isActive} onToggle={handleToggleActiveStatus} />
            <DegreeTable
                searchValue={searchValue}
                isActive={isActive}
                refreshKey={shouldRefreshTable}
                onModify={handleShowModifyModal}
                onDelete={handleShowDeleteModal}
            />
        </Container>
    );
};

export default DegreeAdminPage;



