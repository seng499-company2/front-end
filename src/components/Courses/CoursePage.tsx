import { Button, Flex, TableContainer } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { FaPlus } from "react-icons/fa";

import EditCourseSidesheet from "./EditCourseSidesheet";
import AddCourseSidesheet from "./AddCourseSidesheet";
import { useGetQuery } from "@hooks/useRequest";
import CoursesTable from "./CoursesTable";

const CoursePage = () => {
    const [detailsIsOpen, setDetailsIsOpen] = useState(false);
    const [addIsOpen, setAddIsOpen] = useState(false);
    const [course, setCourse] = useState({});

    const { data, execute } = useGetQuery("/api/courses/");

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
                <CoursesTable onClick={onClick} data={data} />
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

export default CoursePage;
