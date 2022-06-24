import {
    Box,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { ReactElement, useState } from "react";

import CourseSidesheet from "../components/Courses/Sidesheet";
import AdminLayout from "../components/Layout/AdminLayout";

const Courses = ({ courses }) => {
    const [open, setOpen] = useState(false);
    const [course, setCourse] = useState({});

    const onClick = (course) => {
        setOpen(true);
        setCourse(course);
    };

    return (
        <Box pt="1rem">
            <TableContainer>
                <Table variant="striped">
                    <Thead>
                        <Tr>
                            <Th>Code</Th>
                            <Th>Name</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {courses.map((course) => (
                            <Tr
                                cursor={"pointer"}
                                key={course.id}
                                onClick={() => onClick(course)}
                            >
                                <Td>{course.code}</Td>
                                <Td>{course.name}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <CourseSidesheet
                isOpen={open}
                onClose={() => setOpen(false)}
                course={course}
            />
        </Box>
    );
};

export const getServerSideProps = async () => {
    const courses = [
        { id: 1, code: "CSC 225", name: "Data Structures & Algorithms I" },
        { id: 2, code: "CSC 226", name: "Data Structures & Algorithms II" },
        { id: 3, code: "CSC 227", name: "Data Structures & Algorithms III" },
    ];

    // get from api
    // const courses = fetch(`${API_URL}/v1/courses`);

    return {
        props: {
            courses,
        },
    };
};

Courses.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Courses;
