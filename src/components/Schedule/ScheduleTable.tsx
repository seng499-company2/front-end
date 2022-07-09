import { ChevronRightIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useMemo } from "react";

import Table from "../Table";
import { CourseNameBox } from "src/components/Courses/CourseNameBox";
import { CourseTimeBox } from "src/components/Schedule/CourseTimeBox";

const ScheduleTable = ({ schedule, generated, onClick }) => {
    if (!generated) {
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

    const makeTableData = useMemo(() => {
        return schedule.map((row) => {
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
                time: <CourseTimeBox courseTime={row.time} />,
                capacity: row.capacity,
                details: (
                    <Button variant="ghost" onClick={() => onClick(row)}>
                        <ChevronRightIcon ml={1} w={5} h={5} />
                    </Button>
                ),
            };
        });
    }, [schedule, onClick]);

    return <Table columns={columns} data={makeTableData} />;
};

export default ScheduleTable;
