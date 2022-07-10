import { Button } from "@chakra-ui/button";
import { Box, Center } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";

import { useGetQuery } from "@hooks/useRequest";
import { FiRefreshCw } from "react-icons/fi";
import ProfessorsTable from "./ProfessorsTable";

const ProfessorsTableWrapper = ({ openDetails }) => {
    const { data, isLoading, isError, execute } = useGetQuery("/api/users");

    if (isLoading)
        return (
            <Center height="50vh">
                <CircularProgress isIndeterminate />
            </Center>
        );

    if (isError) return <Center>Error</Center>;

    return (
        <Box>
            <Button
                onClick={() => execute()}
                leftIcon={<FiRefreshCw />}
                size="sm"
            >
                Refresh
            </Button>
            <ProfessorsTable professors={data} openDetails={openDetails} />
        </Box>
    );
};
export default ProfessorsTableWrapper;
