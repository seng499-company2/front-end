import {
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Text,
    Divider,
} from "@chakra-ui/react";

const CoursesTable = ({ courses, toggleSideSheet }) => {
    return (
        <Table variant="striped">
            <Thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Professor Willing</Th>
                    <Th>Offered In</Th>
                </Tr>
            </Thead>
            <Tbody>
                {courses.map((course) => (
                    <Tr
                        cursor={"pointer"}
                        key={course.id}
                        onClick={() => toggleSideSheet()}
                    >
                        <Td>
                            <Text as="b">{course.code} </Text>
                            <Divider />
                            <Text fontSize="sm" as="i">
                                {course.name}
                            </Text>
                        </Td>
                        <Td>{course.willing}</Td>
                        <Td>{course.offered}</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default CoursesTable;
