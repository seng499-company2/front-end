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
import useAuth from "@hooks/useAuth";

const AdminPreferences = ({ professor, isDisabled, handleSubmit }) => {
    const {
        user: { username },
    } = useAuth();
    const profIsAdmin = username === professor.username;
    const preferencesPath = profIsAdmin
        ? `/api/preferences/`
        : `/api/preferences/${professor.username}/`;

    const { data, isError, isLoading, execute } = useGetQuery(preferencesPath, {
        manual: false,
        ssr: false,
        useCache: false,
    });
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
                        There was an error loading preferences.
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
                    profType={professor.type}
                />
            )}
        </>
    );
};

export default AdminPreferences;
