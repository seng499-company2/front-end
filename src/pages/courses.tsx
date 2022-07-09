import { Button, Flex, TableContainer } from "@chakra-ui/react";
import { ReactElement, useCallback, useState } from "react";
import { FaPlus } from "react-icons/fa";
import dynamic from "next/dynamic";

import CourseSidesheet from "../components/Courses/Sidesheet";
import AdminLayout from "../components/Layout/AdminLayout";
import AddCourseSidesheet from "../components/Courses/AddCourseSidesheet";

const DynamicCourseTable = dynamic(
    () => import("../components/Courses/CoursesTable"),
    { ssr: false }
);

const Courses = () => {
    const [detailsIsOpen, setDetailsIsOpen] = useState(false);
    const [addIsOpen, setAddIsOpen] = useState(false);

    const [course, setCourse] = useState({});

    const onClick = useCallback((data) => {
        setDetailsIsOpen(true);
        setCourse(data);
    }, []);

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
                <DynamicCourseTable onClick={onClick} />
            </TableContainer>
            <CourseSidesheet
                isOpen={detailsIsOpen}
                onClose={() => setDetailsIsOpen(false)}
                course={course}
            />
        </Flex>
    );
};

Courses.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Courses;
