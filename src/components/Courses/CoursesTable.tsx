import { Tag } from "@chakra-ui/react";
import { useMemo } from "react";

import Table from "../Table";
import { CourseNameBox } from "./CourseNameBox";
import { SemesterBadges } from "../SemesterBadges";

const CoursesTable = ({ courses, toggleSideSheet }) => {
    const columns = [
        {
            Header: "Name",
            accessor: "name",
            filter: {
                type: "text",
                key: "codeAndName",
            },
        },
        {
            Header: "Professor Willing",
            accessor: "professorWilling",
            disableFilterBy: true,
        },
        {
            Header: "Offered In",
            accessor: "offered",
            filter: {
                type: "dropdown",
                options: [
                    { label: "Fall", value: "fall" },
                    { label: "Spring", value: "spring" },
                    { label: "Summer", value: "summer" },
                ],
                key: "semesterString",
            },
        },
    ];

    const makeTableData = useMemo(() => {
        return courses.map((course) => {
            return {
                name: (
                    <CourseNameBox
                        courseCode={course.code}
                        courseName={course.name}
                        codeAndName={course.code + course.name}
                    />
                ),
                professorWilling: course.willing,
                offered: (
                    <SemesterBadges
                        semesters={course.offered}
                        semesterString={course.offered.join().toLowerCase()}
                    />
                ),
            };
        });
    }, []);

    return <Table columns={columns} entries={makeTableData} />;
};

export default CoursesTable;
