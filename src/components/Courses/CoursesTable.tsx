import { ChevronRightIcon } from "@chakra-ui/icons";
import {
    Button,
    Center,
    CircularProgress,
    Text,
    useTheme,
    VStack,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { useConst } from "@chakra-ui/react";
import Table from "@components/Table";
import { CourseNameBox } from "./CourseNameBox";
import { SemesterBadges } from "../SemesterBadges";

const CoursesTable = ({ onClick, data, isLoading, isError, execute }) => {
    const {
        colors: { primary },
    } = useTheme();

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
            Header: "Year Requirement",
            accessor: "yearRequired",
            filter: {
                type: "dropdown",
                options: [
                    { label: "1st Year", value: "1" },
                    { label: "2nd Year", value: "2" },
                    { label: "3rd Year", value: "3" },
                    { label: "4th Year", value: "4" },
                ],
                key: "yearRequired", //which prop to filter by
            },
        },
        {
            Header: "# of Sections",
            accessor: "num_sections",
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
            Header: "PEng Required",
            accessor: "pengRequired",
            filter: {
                type: "dropdown",
                options: [
                    { label: "Fall", value: "fall" },
                    { label: "Spring", value: "spring" },
                    { label: "Summer", value: "summer" },
                ],
                key: "pengString",
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

    const formatPEngSemester = (dict) => {
        const pengArray = [];
        for (const [key, value] of Object.entries(dict)) {
            if (value) {
                pengArray.push(key);
            }
        }
        return pengArray;
    };

    const makeTableData = useMemo(() => {
        if (!data || data?.length === 0) return [];
        if (isLoading)
            return (
                <Center height="50vh">
                    <CircularProgress color={primary[400]} isIndeterminate />
                </Center>
            );

        if (isError)
            return (
                <Center>
                    <VStack gap={4}>
                        <Text fontSize="xl" color="red">
                            Error fetching data
                        </Text>
                        <Button colorScheme={"red"} onClick={() => execute()}>
                            Try again
                        </Button>
                    </VStack>
                </Center>
            );
        return data.map((course) => {
            return {
                name: (
                    <CourseNameBox
                        courseCode={course?.course_code}
                        courseName={course?.course_title}
                        codeAndName={course?.course_code + course?.course_title}
                    />
                ),
                yearRequired: course.yearRequired.toString(),
                num_sections: course.num_sections.toString(),
                offered: (
                    <SemesterBadges
                        semesters={formatSemester(course)}
                        semesterString={formatSemester(course).toString()}
                    />
                ),
                pengRequired: (
                    <SemesterBadges
                        semesters={formatPEngSemester(course.pengRequired)}
                        useColor={false}
                        semesterString={formatPEngSemester(
                            course.pengRequired
                        ).toString()}
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
