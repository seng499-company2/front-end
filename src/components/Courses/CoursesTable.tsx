import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

const CoursesTable = ({ courses, setOpen }) => {
    return (
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
    );
};

export default CoursesTable;
