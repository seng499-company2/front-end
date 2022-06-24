import {
    Box,
    Button,
    Flex,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import { FaPlus } from "react-icons/fa";

import AdminLayout from "../components/Layout/AdminLayout";
import AddCourseSidesheet from "../components/Courses/AddCourseSidesheet";

const Courses = ({ courses }) => {
    const [open, setOpen] = useState(false);

    const handleSubmit = (values) => {
        alert(JSON.stringify(values, null, 2));
        setOpen(false);
    };

    return (
        <Flex flexDirection="column" pt="1rem">
            <Button ml="auto" leftIcon={<FaPlus/>} onClick={() => setOpen(true)}>Add Course</Button>
            <AddCourseSidesheet isOpen={open}
                onClose={() => setOpen(false)}
                handleSubmit={handleSubmit}/>

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
                                onClick={() => setOpen(!open)}
                            >
                                <Td>{course.code}</Td>
                                <Td>{course.name}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
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
