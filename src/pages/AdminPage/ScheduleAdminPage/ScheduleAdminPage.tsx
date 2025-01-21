import { Container, Table } from "react-bootstrap";
import Title from "../../../components/Title/Title";
import CreateButton from "../../../components/Buttons/CreateButton";
import { useState } from "react";

const API_URL = import.meta.env.VITE_BASE_URL;

interface ScheduleItem {
    startTime: string;
    endTime: string;
    room: string;
    professor: string;
    course: string;
    type: string;
}

interface Schedule {
    Monday: ScheduleItem[];
    Tuesday: ScheduleItem[];
    Wednesday: ScheduleItem[];
    Thursday: ScheduleItem[];
    Friday: ScheduleItem[];
}

const initialSchedule: Schedule = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
};

const ScheduleAdminPage: React.FC = () => {
    const [schedule, setSchedule] = useState<Schedule>(initialSchedule);
    const [loading, setLoading] = useState<boolean>(false);

    const handleGenerateSchedule = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/schedule/`);
            const data = await response.json();

            const updatedSchedule = data.schedule || {};
            setSchedule({
                Monday: updatedSchedule.Monday || [],
                Tuesday: updatedSchedule.Tuesday || [],
                Wednesday: updatedSchedule.Wednesday || [],
                Thursday: updatedSchedule.Thursday || [],
                Friday: updatedSchedule.Friday || [],
            });
        } catch (error) {
            console.error("Error fetching schedule:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Title text="Schedule Management" />
            <CreateButton
                text_button="Generate Schedule"
                onPress={handleGenerateSchedule}
            />

            {loading && (
                <div className="text-center mt-4">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            <Table striped bordered hover responsive className="mt-4">
                <thead>
                <tr>
                    <th>Day</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Room</th>
                    <th>Professor</th>
                    <th>Course</th>
                    <th>Type</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(schedule).map(([day, entries]) =>
                    Array.isArray(entries) && entries.length > 0 ? (
                        entries.map((item, index) => (
                            <tr key={`${day}-${index}`}>
                                {index === 0 && (
                                    <td rowSpan={entries.length} style={{ verticalAlign: "top" }}>
                                        {day}
                                    </td>
                                )}
                                <td>{item.startTime}</td>
                                <td>{item.endTime}</td>
                                <td>{item.room}</td>
                                <td>{item.professor}</td>
                                <td>{item.course}</td>
                                <td>{item.type}</td>
                            </tr>
                        ))
                    ) : (
                        <tr key={day}>
                            <td>{day}</td>
                            <td colSpan={6} className="text-center">
                                No schedule available
                            </td>
                        </tr>
                    )
                )}
                </tbody>
            </Table>
        </Container>
    );
};

export default ScheduleAdminPage;
