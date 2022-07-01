import { ChevronRightIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useMemo } from "react";

import Table from "../Table";
import { CourseNameBox } from "src/components/Courses/CourseNameBox";

const ScheduleTable = ({ schedule, onClick }) => {
    if (!schedule) {
        return <></>;
    }
    const columns = [
        {
            Header: "COURSE",
            accessor: "course",
            filter: {
                type: "text",
                key: "codeAndName",
            },
        },
        {
            Header: "SECTION",
            accessor: "section",
            filter: {
                type: "dropdown",
                options: [
                    { label: "A01", value: "A01" },
                    { label: "A02", value: "A02" },
                ],
            },
            disableSortBy: true,
        },
        {
            Header: "INSTRUCTOR",
            accessor: "instructor",
            filter: {
                type: "text",
            },
        },
        {
            Header: "TIME",
            accessor: "time",
            disableFilterBy: true,
        },
        {
            Header: "CAPACITY",
            accessor: "capacity",
            disableFilterBy: true,
        },
        {
            Header: "",
            accessor: "details",
            disableSortBy: true,
            disableFilterBy: true,
        },
    ];

    // mock schedule
    const mockSchedule = [
        {
            course: {
                code: "CSC 225",
                name: "Algorithms and Data Structures: I",
            },
            section: "A01",
            instructor: "I.N. Structor",
            time: "TuWF 8:30am - 9:20am",
            capacity: "150",
        },
        {
            course: { code: "SENG 275", name: "Software Testing" },
            section: "A01",
            instructor: "Jason Corless",
            time: "TuWF 8:30am - 9:20am",
            capacity: "200",
        },
        {
            course: { code: "SENG 371", name: "Software Evolution" },
            section: "A02",
            instructor: "Jens Weber",
            time: "TuWF 8:30am - 9:20am",
            capacity: "50",
        },
        {
            course: { code: "SENG 499", name: "Design Project II" },
            section: "A01",
            instructor: "Daniela Damian",
            time: "TuWF 8:30am - 9:20am",
            capacity: "80",
        },
    ];

    const makeTableData = useMemo(() => {
        return mockSchedule.map((row) => {
            return {
                course: (
                    <CourseNameBox
                        courseCode={row.course.code}
                        courseName={row.course.name}
                        codeAndName={row.course.code + row.course.name}
                    />
                ),
                section: row.section,
                instructor: row.instructor,
                time: row.time,
                capacity: row.capacity,
                details: (
                    <Button variant="ghost" onClick={() => onClick(row)}>
                        <ChevronRightIcon ml={1} w={5} h={5} />
                    </Button>
                ),
            };
        });
    }, [schedule, onClick]);

    return <Table columns={columns} entries={makeTableData} />;
};

export default ScheduleTable;
