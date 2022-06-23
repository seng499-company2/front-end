import {
    Box,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { ReactElement, useState } from "react";

import AdminLayout from "../components/Layout/AdminLayout";
import SampleSidesheet from "../components/Sample/SampleSidesheet";
import CoursesTable from "../components/Courses/CoursesTable";

const Courses = ({ courses }) => {
    const [open, setOpen] = useState(false);

    const handleSubmit = (values) => {
        alert(JSON.stringify(values, null, 2));
        setOpen(false);
    };

    function toggleSideSheet() {
        setOpen(!open);
    }

    return (
        <Box pt="1rem">
            <TableContainer>
                <CoursesTable
                    courses={courses}
                    toggleSideSheet={toggleSideSheet}
                />
            </TableContainer>
            <SampleSidesheet
                isOpen={open}
                onClose={() => setOpen(false)}
                handleSubmit={handleSubmit}
            />
        </Box>
    );
};

export const getServerSideProps = async () => {
    const courses = [
        {
            id: 1,
            code: "CSC 225",
            name: "Data Structures & Algorithms I",
            willing: 3,
            offered: ["summer", "fall"],
        },
        {
            id: 2,
            code: "CSC 226",
            name: "Data Structures & Algorithms II",
            willing: 1,
            offered: ["summer", "fall"],
        },
        {
            id: 3,
            code: "CSC 227",
            name: "Data Structures & Algorithms III",
            willing: 0,
            offered: ["summer"],
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
