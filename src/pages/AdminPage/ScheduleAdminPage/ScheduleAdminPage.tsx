import {Container} from "react-bootstrap";
import Title from "../../../components/Title/Title.tsx";
import CreateButton from "../../../components/Buttons/CreateButton.tsx";

const ScheduleAdminPage  = () => {
    return (
        <Container>
            <Title text="Schedule Management" />
            <CreateButton
                text_button="Generate Schedule"
                onPress={() => {console.log("On Press")}}
            />
        </Container>
    )
}

export default ScheduleAdminPage
