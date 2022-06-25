import {
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

import CourseSidesheet from "../components/Courses/Sidesheet";
import AdminLayout from "../components/Layout/AdminLayout";
import SampleSidesheet from "../components/Sample/SampleSidesheet";
import CoursesTable from "../components/Courses/CoursesTable";
import AddCourseSidesheet from "../components/Courses/AddCourseSidesheet";

const Courses = ({ courses }) => {
    const [open, setOpen] = useState(false);
    const [course, setCourse] = useState({});

    const onClick = (course) => {
        setOpen(true);
        setCourse(course);
    };

    function toggleSideSheet() {
        setOpen(!open);
    }

    return (
        <Flex flexDirection="column" pt="1rem">
            <Button
                ml="auto"
                leftIcon={<FaPlus />}
                onClick={() => setOpen(true)}
            >
                Add Course
            </Button>
            <AddCourseSidesheet
                isOpen={open}
                onClose={() => setOpen(false)}
                //handleSubmit={handleSubmit}
            />
            <TableContainer>
                <CoursesTable
                    courses={courses}
                    toggleSideSheet={toggleSideSheet}
                />
            </TableContainer>
            <CourseSidesheet
                isOpen={open}
                onClose={() => setOpen(false)}
                course={course}
            />
        </Flex>
    );
};

export const getServerSideProps = async () => {
    const courses = [
        {
            id: 1,
            code: "CSC 225",
            name: "Data Structures & Algorithms I",
            willing: 3,
            offered: ["Summer", "Fall"],
        },
        {
            id: 2,
            code: "CSC 226",
            name: "Data Structures & Algorithms II",
            willing: 1,
            offered: ["Summer", "Fall"],
        },
        {
            id: 3,
            code: "CSC 227",
            name: "Data Structures & Algorithms III",
            willing: 0,
            offered: ["Summer"],
        },
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
