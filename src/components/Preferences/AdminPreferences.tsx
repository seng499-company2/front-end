import {
    Button,
    HStack,
    Progress,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";

import { useGetQuery } from "@hooks/useRequest";
import { FiRefreshCcw } from "react-icons/fi";
import PreferencesForm from "./PreferencesForm";
import { convertFromBackendFormat } from "@lib/format";

const AdminPreferences = ({
    professor,
    isDisabled,
    handleSubmit,
    isPostLoading,
    isPostError,
}) => {
    const { data, isError, isLoading, execute } = useGetQuery(
        `/api/preferences/${professor.username}/`,
        {
            manual: false,
            ssr: false,
            useCache: false,
        }
    );
    const initialValues = convertFromBackendFormat(data);
    const errorBgColor = useColorModeValue("red.100", "red.400");
    const showForm = !isLoading && !isError;

    return (
        <>
            {isLoading && (
                <Progress isIndeterminate hasStripe size="lg" mb={4} />
            )}
            {isError && (
                <HStack
                    spacing={4}
                    bg={errorBgColor}
                    borderRadius={"md"}
                    justifyContent={"space-between"}
                    mb={4}
                    p={2}
                >
                    <Text fontSize="sm" colorScheme="primary">
                        There was an error loading your preferences.
                    </Text>
                    <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => execute()}
                        leftIcon={<FiRefreshCcw />}
                    >
                        Try again
                    </Button>
                </HStack>
            )}
            {showForm && (
                <PreferencesForm
                    isDisabled={isDisabled}
                    initialValues={initialValues}
                    isProfessorPage={true}
                    handleSubmit={handleSubmit}
                    isError={isPostError}
                    isLoading={isPostLoading}
                    //endpoint={"/api/preferences/" + professor.username + "/"}
                    //username={professor.username}
                />
            )}
        </>
    );
};

export default AdminPreferences;
