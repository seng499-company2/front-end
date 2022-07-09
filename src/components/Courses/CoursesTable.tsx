import { ChevronRightIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useMemo } from "react";
import { useConst } from "@chakra-ui/react";
import Table from "@components/Table";
import { CourseNameBox } from "./CourseNameBox";
import { SemesterBadges } from "../SemesterBadges";
import { useGetQuery } from "@hooks/useRequest";

const CoursesTable = (props) => {
    const { onClick } = props;

    const { data } = useGetQuery("/api/courses/");

    const columns = useConst([
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
                key: "semesterString", //which prop to filter by
            },
        },
        {
            Header: "",
            accessor: "details",
            disableSortBy: true,
            disableFilterBy: true,
        },
    ]);

    const formatSemester = (obj) => {
        let semArray = [];
        if (obj.fall_offering) {
            semArray.push("fall");
        }
        if (obj.spring_offering) {
            semArray.push("spring");
        }
        if (obj.summer_offering) {
            semArray.push("summer");
        }
        return semArray;
    };

    const makeTableData = useMemo(() => {
        if (!data || data?.length === 0) return [];
        return data.map((course) => {
            return {
                name: (
                    <CourseNameBox
                        courseCode={course?.course_code}
                        courseName={course?.course_title}
                        codeAndName={course?.course_code + course?.course_title}
                    />
                ),
                //professorWilling: course.willing, //not included in request data
                offered: (
                    <SemesterBadges
                        semesters={formatSemester(course)}
                        semesterString={formatSemester(course).toString()}
                    />
                ),
                details: (
                    <Button variant="ghost" onClick={() => onClick(course)}>
                        <ChevronRightIcon ml={1} w={5} h={5} />
                    </Button>
                ),
            };
        });
    }, [data, onClick]);

    return <Table columns={columns} data={makeTableData} />;
};

export default CoursesTable;
