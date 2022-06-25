import { Text, Divider, Tag } from "@chakra-ui/react";
import { useMemo } from "react";

import Table from "../Table";


const CoursesTable = ({ courses, toggleSideSheet }) => {
    const columns = [
    {
        Header: "Name",
        accessor: "name",
        filter: {
            type: "text",
        },
    },
    {
        Header: "Professor Willing",
        accessor: "professorWilling",
        disableFilterBy: true,
    },
    {
        Header: "Offered In",
        accessor: "offeredIn",
        filter: {
            type: "dropdown",
            options: [
                { label: "Fall", value: "fall" },
                { label: "Spring", value: "spring" },
                { label: "Summer", value: "summer" },
            ],
        },
    }];

    const makeTableData = useMemo(() => {
        return courses.map((course) => {
            return {
                name: (
                    <>
                    <Text as="b">{course.code}</Text>
                    <Divider />
                    <Text fontSize="sm" as="i">
                        {course.name}
                    </Text>
                    </>
                ),
                professorWilling: course.willing,
                offeredIn: (
                    course.offered.map((semester) => (
                        <Tag colorScheme="teal" mr={1}>{semester}</Tag>
                    ))
                ),
            };
        });
    }, []);

    return <Table columns={columns} entries={makeTableData} />;

};

export default CoursesTable;
