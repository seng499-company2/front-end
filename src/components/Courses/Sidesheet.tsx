import { VStack, Text, Box, Divider } from "@chakra-ui/react";
import { useMemo } from "react";

import Sidesheet from "../Layout/Sidesheet";
import Table from "../Table";

const scheduleTableColumn = [
    {
        Header: "Semester",
        accessor: "semester",
        filter: {
            type: "dropdown",
            options: [
                { value: "fall", label: "Fall" },
                { value: "spring", label: "Spring" },
                { value: "summer", label: "Summer" },
            ],
        },
    },
    {
        Header: "Class Size",
        accessor: "classSize",
        filter: {
            type: "text",
        },
    },
    {
        Header: "Time",
        accessor: "time",
        disableSortBy: true,
        disableFilterBy: true,
    },
    {
        Header: "Professor",
        accessor: "professor",
        filter: {
            type: "text",
        },
    },
];

const willingProfessorsColumns = [
    {
        Header: "Professor",
        accessor: "professor",
        filter: {
            type: "text",
        },
    },
];

const scheduledSemesters = [
    {
        semester: "Fall",
        classSize: "10",
        time: "MWF 10:00-11:15",
        professor: "John Doe",
    },
    {
        semester: "Spring",
        classSize: "10",
        time: "MWF 10:00-11:15",
        professor: "John Doe",
    },
    {
        semester: "Summer",
        classSize: "10",
        time: "MWF 10:00-11:15",
        professor: "John Doe",
    },
];
const willingProfessors = [
    { name: "Professor A", id: "profA" },
    { name: "Professor B", id: "profB" },
    { name: "Professor C", id: "profC" },
    { name: "Professor D", id: "profD" },
];

export const CourseSidesheet = ({ isOpen, onClose, course }) => {
    const scheduleTableEntries = useMemo(() => {
        return scheduledSemesters.map(
            ({ semester, classSize, time, professor }) => {
                return {
                    semester,
                    classSize,
                    time,
                    professor,
                };
            }
        );
    }, []);

    const willingProfessorsEntries = useMemo(() => {
        return willingProfessors.map(({ name }) => ({ professor: name }));
    }, []);

    return (
        <Sidesheet
            size="xl"
            title={course.code}
            subTitle={course.name}
            isOpen={isOpen}
            onClose={onClose}
        >
            <VStack gap={8} pt={4}>
                <Box w="100%">
                    <Text>Scheduled Semesters</Text>
                    <Table
                        columns={scheduleTableColumn}
                        entries={scheduleTableEntries}
                    />
                </Box>

                <Divider />

                <Box w="100%">
                    <Text>Willing Professors</Text>
                    <Table
                        columns={willingProfessorsColumns}
                        entries={willingProfessorsEntries}
                    />
                </Box>
            </VStack>
        </Sidesheet>
    );
};

export default CourseSidesheet;
