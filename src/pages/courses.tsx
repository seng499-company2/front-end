import { Button, Flex, TableContainer } from "@chakra-ui/react";
import { ReactElement, useCallback, useState } from "react";
import { FaPlus } from "react-icons/fa";
import dynamic from "next/dynamic";

import EditCourseSidesheet from "../components/Courses/EditCourseSidesheet";
import AdminLayout from "../components/Layout/AdminLayout";
import AddCourseSidesheet from "../components/Courses/AddCourseSidesheet";
import { useGetQuery } from "@hooks/useRequest";

const DynamicCourseTable = dynamic(
    () => import("../components/Courses/CoursesTable"),
    { ssr: false }
);

const Courses = () => {
    const [detailsIsOpen, setDetailsIsOpen] = useState(false);
    const [addIsOpen, setAddIsOpen] = useState(false);
    const [course, setCourse] = useState({});

    const { data, isLoading, isError, execute } = useGetQuery("/api/courses/");

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
                refetch={execute}
            />
            <TableContainer>
                <DynamicCourseTable onClick={onClick} data={data} />
            </TableContainer>
            <EditCourseSidesheet
                isOpen={detailsIsOpen}
                onClose={() => setDetailsIsOpen(false)}
                course={course}
                refetch={execute}
            />
        </Flex>
    );
};

Courses.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Courses;
