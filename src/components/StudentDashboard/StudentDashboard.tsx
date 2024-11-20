import React from "react";
import { Card, Row, Col, Container, Button, ListGroup } from "react-bootstrap";
import { FaCalendarAlt, FaBookOpen, FaUserGraduate } from "react-icons/fa";

const StudentDashboard: React.FC = () => {
    return (
        <section className="student-dashboard">
            <Container fluid>
                <h1 className="mb-4 text-center">Student Dashboard</h1>

                {/* Row 1: Next Class and Enrolled Courses */}
                <Row className="mb-4">
                    {/* Next Class */}
                    <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Header>
                                <FaCalendarAlt className="me-2" />
                                Next Class
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>Mathematics: Calculus</Card.Title>
                                <Card.Text>
                                    <strong>Date:</strong> November 20, 2024 <br />
                                    <strong>Time:</strong> 10:00 AM
                                </Card.Text>
                                <Button variant="info" className="w-100">
                                    View Full Schedule
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Enrolled Courses */}
                    <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Header>
                                <FaBookOpen className="me-2" />
                                Enrolled Courses
                            </Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Mathematics</ListGroup.Item>
                                    <ListGroup.Item>Physics</ListGroup.Item>
                                    <ListGroup.Item>History</ListGroup.Item>
                                    <ListGroup.Item>Chemistry</ListGroup.Item>
                                </ListGroup>
                                <Button variant="primary" className="w-100 mt-3">
                                    View All Courses
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Row 2: Profile and Performance */}
                <Row>
                    {/* Profile Information */}
                    <Col md={6}>
                        <Card className="shadow-sm mb-4">
                            <Card.Header>
                                <FaUserGraduate className="me-2" />
                                My Profile
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>John Doe</Card.Title>
                                <Card.Text>
                                    <strong>Email:</strong> john.doe@example.com <br />
                                    <strong>Grade:</strong> 10
                                </Card.Text>
                                <Button variant="success" className="w-100">
                                    Update Profile
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Performance Overview */}
                    <Col md={6}>
                        <Card className="shadow-sm mb-4">
                            <Card.Header>
                                <FaUserGraduate className="me-2" />
                                Performance
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>Track Your Progress</Card.Title>
                                <Card.Text>
                                    Check your grades and attendance records to stay updated.
                                </Card.Text>
                                <Button variant="warning" className="w-100">
                                    View Performance
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default StudentDashboard;
