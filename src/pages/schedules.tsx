import { Center, Button, Progress } from "@chakra-ui/react";
import { ReactElement, useState } from "react";

import AdminLayout from "../components/Layout/AdminLayout";

const Schedules = ({ scheduledCourses }) => {
    return (
        <Center height="50vh">
            <Button>Generate Schedule</Button>
            <Progress size="xs" isIndeterminate />
        </Center>
    );
};

Schedules.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Schedules;
