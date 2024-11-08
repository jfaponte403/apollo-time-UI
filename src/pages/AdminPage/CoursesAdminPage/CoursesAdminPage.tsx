import {Container} from "react-bootstrap";
import React, {useState} from "react";
import Title from "../../../components/Title/Title.tsx";
import CreateButton from "../../../components/Buttons/CreateButton.tsx";
import CreateCourseModal from "../../../components/Courses/CreateCourseModal.tsx";

const CoursesAdminPage: React.FC = () => {
    const [showModalCreate, setShowModalCreate] = useState<boolean>(false)

    const handleCloseCreateModal = () => {
        setShowModalCreate(false)
    }

    const handleShowCreateModal = (value: boolean) => {
        setShowModalCreate(value)
    }

    return (
        <Container>
            <Title text="Courses Admin Page" />
            <CreateButton text_button="Create a new course" onPress={handleShowCreateModal} />
            <CreateCourseModal
                isOpen={showModalCreate}
                onClose={handleCloseCreateModal} />
        </Container>
    )
}

export default CoursesAdminPage
