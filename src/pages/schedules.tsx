import { Center, Button, Text, VStack } from "@chakra-ui/react";
import { ReactElement } from "react";

import AdminLayout from "@components/Layout/AdminLayout";
import useGetQuery from "@hooks/useGetQuery";
import ScheduleTable from "@components/Schedule/ScheduleTable";

const Schedules = ({ scheduledCourses }) => {
    const { data, isLoading, isError, execute } = useGetQuery(
        "/schedule/2022/FALL/2",
        {
            manual: true,
        }
    );

    const onClick = (course) => {
        // TODO: schedule sidesheet
    };

    return (
        <Center height="50vh">
            <VStack gap={4}>
                <Button
                    onClick={() => {
                        execute();
                    }}
                    isLoading={isLoading}
                >
                    Generate Schedule
                </Button>
                <ScheduleTable schedule={data} onClick={onClick} />
                {isError && <Text color="red">Error</Text>}
            </VStack>
        </Center>
    );
};

Schedules.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Schedules;
