import {
    Button,
    HStack,
    Progress,
    Text,
    useColorModeValue,
    useToast,
} from "@chakra-ui/react";

import { useGetQuery, usePostQuery } from "@hooks/useRequest";
import { FiRefreshCcw } from "react-icons/fi";
import PreferencesForm from "./PreferencesForm";
import useAuth from "@hooks/useAuth";
import {
    convertFromBackendFormat,
    convertToBackendPreferencesFormat,
} from "@lib/format";

const PreferencesFormWrapper = () => {
    const { user } = useAuth();
    const toast = useToast();

    const {
        data: userData,
        isLoading: isLoadingUserData,
        isError: isErrorUserData,
    } = useGetQuery("/api/user/");

    const {
        isError,
        isLoading,
        execute: executeEdit,
    } = usePostQuery(`/api/preferences/`);

    const {
        data: preferencesData,
        isError: getPreferencesError,
        isLoading: isLoadingPreferences,
        execute: executeGet,
    } = useGetQuery(`/api/preferences/`, {
        manual: false,
        ssr: false,
        useCache: false,
    });

    const submitPreferencesData = (data) => {
        executeEdit({
            data: convertToBackendPreferencesFormat({
                ...data,
                professor: user.username,
            }),
        }).then((response) => {
            toast({
                title: "Preferences Edited Successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        });
    };

    const initialValues = convertFromBackendFormat(preferencesData);
    const errorBgColor = useColorModeValue("red.100", "red.400");

    const getIsLoading = isLoadingUserData || isLoadingPreferences;
    const getError = isErrorUserData || getPreferencesError;

    const showForm = !getIsLoading && !getError;

    return (
        <>
            {getIsLoading && (
                <Progress isIndeterminate hasStripe size="lg" mb={4} />
            )}
            {getError && (
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
                        onClick={() => executeGet()}
                        leftIcon={<FiRefreshCcw />}
                    >
                        Try again
                    </Button>
                </HStack>
            )}
            {showForm && (
                <PreferencesForm
                    isDisabled={getIsLoading}
                    initialValues={initialValues}
                    handleSubmit={submitPreferencesData}
                    isError={isError}
                    isLoading={isLoading}
                    profType={userData.prof_type}
                />
            )}
        </>
    );
};

export default PreferencesFormWrapper;
