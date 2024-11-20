import React, { useEffect, useState } from 'react';
import { readResource } from "../../api/api.ts";
import { Container, Table } from "react-bootstrap";
import DeleteButton from "../Buttons/DeleteButton.tsx";
import ModifyButton from "../Buttons/ModifyButton.tsx";
import {Course} from "../../interfaces/Course.ts";

interface Response {
    courses: Course[];
}

interface CoursesTableProps {
    searchQuery: string;
    isActive: boolean;
    refreshKey: boolean;
    onModify: (value: Course) => void;
    onDelete: (value: Course) => void;
}

const CoursesTable: React.FC<CoursesTableProps> = ({ searchQuery, isActive, refreshKey, onModify, onDelete }) => {
    const [courseList, setCourseList] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

    useEffect(() => {
        readResource<Response>('/course')
            .then(response => {
                if (response.status === 200) {
                    setCourseList(response.data.courses);
                }
            })
            .catch(error => {
                console.error("Error fetching courses:", error);
            });
    }, [refreshKey]);

    useEffect(() => {
        let filtered = [...courseList];

        if (searchQuery) {
            filtered = filtered.filter(course =>
                course.name?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (isActive !== undefined) {
            filtered = filtered.filter(course => course.is_active === isActive);
        }

        setFilteredCourses(filtered);
    }, [courseList, searchQuery, isActive]);

    return (
        <Container>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Created At</th>
                    <th>Active</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredCourses.map(course => (
                    <tr key={course.id}>
                        <td>{new Date(course.created_at).toLocaleDateString()}</td>
                        <td>{course.is_active ? "Yes" : "No"}</td>
                        <td>{course.name}</td>
                        <td className="actions">
                            <ModifyButton text_button="Modify" onPress={() => onModify(course)}/>
                            <DeleteButton text_button="Delete" onPress={() => onDelete(course)}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default CoursesTable;
