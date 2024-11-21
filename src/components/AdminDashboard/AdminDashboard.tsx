import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './AdminDashboard.css';
import getAuthToken from "../../utils/authToken.ts";
import { readResource } from "../../api/api.ts";

interface getUserRequest {
    name: string;
}

const AdminDashboard: React.FC = () => {
    const [adminUserName, setAdminUserName] = useState<string>("admin");
    const [studentsCount, setStudentsCount] = useState<number>(0);
    const [teachersCount, setTeachersCount] = useState<number>(0);
    const [coursesCount, setCoursesCount] = useState<number>(0);

    useEffect(() => {
        const decodeToken = getAuthToken();

        // Fetch Admin User Info
        readResource<getUserRequest>(`/user/${decodeToken.id}`)
            .then(response => {
                if (response.status === 200) {
                    setAdminUserName(response.data.name);
                }
            });

        // Placeholder values for student, teacher, and course counts
        // Fetching from the API can be done here for real counts
        setStudentsCount(120);  // Example placeholder value
        setTeachersCount(15);   // Example placeholder value
        setCoursesCount(10);    // Example placeholder value
    }, []);

    return (
        <Container fluid className="admin-dashboard">
            <Row>
                <Col xs={12}>
                    <h1>Welcome, {adminUserName}</h1>
                    <p>Here is a quick overview of your system.</p>
                </Col>
            </Row>

            <Row className="stats-row">
                <Col sm={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Students</Card.Title>
                            <Card.Text>{studentsCount}</Card.Text>
                            <Link to="/admin/students">
                                <Button variant="primary">Review Students</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Teachers</Card.Title>
                            <Card.Text>{teachersCount}</Card.Text>
                            <Link to="/admin/teachers">
                                <Button variant="primary">Review Teachers</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Courses</Card.Title>
                            <Card.Text>{coursesCount}</Card.Text>
                            <Link to="/admin/courses">
                                <Button variant="primary">Manage Courses</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminDashboard;
