import React from "react";
import { Card, Row, Col, Container, Button, ListGroup } from "react-bootstrap";
import { FaCalendarAlt, FaBookOpen, FaUserGraduate } from "react-icons/fa";

const TeacherDashboard: React.FC = () => {
    return (
        <section className="teacher-dashboard">
            <Container fluid>
                <h1 className="mb-4 text-center">Teacher Dashboard</h1>

                {/* Row 1: Schedule Overview and Course Overview */}
                <Row className="mb-4">
                    {/* Schedule Overview */}
                    <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Header>
                                <FaCalendarAlt className="me-2" />
                                Upcoming Schedule
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>Next Class: Math 101</Card.Title>
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

                    {/* Courses Overview */}
                    <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Header>
                                <FaBookOpen className="me-2" />
                                My Courses
                            </Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Math 101</ListGroup.Item>
                                    <ListGroup.Item>Physics 202</ListGroup.Item>
                                    <ListGroup.Item>History 303</ListGroup.Item>
                                    <ListGroup.Item>Chemistry 404</ListGroup.Item>
                                </ListGroup>
                                <Button variant="primary" className="w-100 mt-3">
                                    View All Courses
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Row 2: Student Actions */}
                <Row>
                    <Col md={6}>
                        <Card className="shadow-sm mb-4">
                            <Card.Header>
                                <FaUserGraduate className="me-2" />
                                View Student Info
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>View and Manage Students</Card.Title>
                                <Card.Text>
                                    Access all student information, including grades and attendance.
                                </Card.Text>
                                <Button variant="success" className="w-100">
                                    Manage Students
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card className="shadow-sm mb-4">
                            <Card.Header>
                                <FaUserGraduate className="me-2" />
                                Student Performance
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>Monitor Student Progress</Card.Title>
                                <Card.Text>
                                    Track your students' performance and see how they are doing.
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

export default TeacherDashboard;
