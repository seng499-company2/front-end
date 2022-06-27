import { Button, Flex, TableContainer } from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import { FaPlus } from "react-icons/fa";

import CourseSidesheet from "../components/Courses/Sidesheet";
import AdminLayout from "../components/Layout/AdminLayout";
import CoursesTable from "../components/Courses/CoursesTable";
import AddCourseSidesheet from "../components/Courses/AddCourseSidesheet";

const Courses = ({ courses }) => {
    const [detailsIsOpen, setDetailsIsOpen] = useState(false);
    const [addIsOpen, setAddIsOpen] = useState(false);
    const [course, setCourse] = useState({});

    const onClick = (course) => {
        setDetailsIsOpen(true);
        setCourse(course);
    };

    return (
        <Flex flexDirection="column" pt="1rem">
            <Button
                ml="auto"
                leftIcon={<FaPlus />}
                onClick={() => setAddIsOpen(true)}
            >
                Add Course
            </Button>
            <AddCourseSidesheet
                isOpen={addIsOpen}
                onClose={() => setAddIsOpen(false)}
                //handleSubmit={handleSubmit}
            />
            <TableContainer>
                <CoursesTable courses={courses} onClick={onClick} />
            </TableContainer>
            <CourseSidesheet
                isOpen={detailsIsOpen}
                onClose={() => setDetailsIsOpen(false)}
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
            offered: ["Summer", "Fall", "Spring"],
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
