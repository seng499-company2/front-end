import {
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    useToast,
    useDisclosure,
    HStack,
    Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import AdminPreferences from "@components/Preferences/AdminPreferences";
import Sidesheet from "../Layout/Sidesheet";
import DeleteConfirmation from "@components/Layout/DeleteConfirmation";
import { useDeleteQuery, usePostQuery } from "@hooks/useRequest";
import EditProfessorForm from "./EditProfessorForm";
import { CompleteStatusBadge } from "@components/CompleteStatusBadge";
import { convertToBackendPreferencesFormat } from "@lib/format";

export const ProfessorSidesheet = ({ isOpen, onClose, professor, refetch }) => {
    const { isPeng, type, firstName, lastName, email, username, complete } =
        professor;

    const [tabIndex, setTabIndex] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const {
        isOpen: deleteOpen,
        onOpen: deleteOnOpen,
        onClose: deleteOnClose,
    } = useDisclosure();
    const toast = useToast();

    const { execute: executeEditDetails, isLoading: isDetailsDataSaving } =
        usePostQuery(`/api/users/${username}/`);

    const {
        execute: executeEditPreferences,
        isLoading: isPreferencesDataSaving,
    } = usePostQuery(`/api/preferences/${username}/`);

    const { execute: executeDelete, isLoading: isDeleteLoading } =
        useDeleteQuery(`/api/users/${username}/`);

    const onEdit = () => {
        setIsEditing(true);
    };

    const onCancel = () => {
        setIsEditing(false);
    };

    const onDelete = () => {
        executeDelete()
            .then((response) => {
                refetch();
                toast({
                    title: "Professor Deleted",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left",
                });
                setIsEditing(false);
                deleteOnClose();
                onClose();
            })
            .catch((error) => {
                toast({
                    title: "Error: " + error.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                    position: "bottom-left",
                });
            });
    };

    useEffect(() => {
        onCancel();
    }, [tabIndex]);

    const submitDetailsData = (values) => {
        executeEditDetails({
            data: values,
        })
            .then((response) => {
                refetch();
                toast({
                    title: "Professor Edited Successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left",
                });
                setIsEditing(false);
                onClose();
            })
            .catch((error) => {
                toast({
                    title: "Error: " + error.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                    position: "bottom-left",
                });
            });
    };

    const handleClose = () => {
        onClose();
        setIsEditing(false);
        setTabIndex(0);
    };

    const submitPreferencesData = (data) => {
        executeEditPreferences({
            data: convertToBackendPreferencesFormat({
                ...data,
                professor: username,
            }),
        })
            .then((response) => {
                toast({
                    title: "Preferences Edited Successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left",
                });
                setIsEditing(false);
                onClose();
            })
            .catch((error) => {
                toast({
                    title: "Error: " + error.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                    position: "bottom-left",
                });
            });
    };

    const typeDisplay = type === "RP" ? "Research" : "Teaching";
    const isPengText = isPeng ? " | Peng" : "";
    const formArray = ["edit-professor-form", "preferences-form"];

    return (
        <>
            <Sidesheet
                size="xl"
                title={`${firstName} ${lastName}`}
                subTitle={`${email} | ${typeDisplay}${isPengText}`}
                formId={formArray[tabIndex]}
                isOpen={isOpen}
                onClose={handleClose}
                onEdit={onEdit}
                onCancel={onCancel}
                onDelete={deleteOnOpen}
                isEditing={isEditing}
                isLoading={isDetailsDataSaving || isPreferencesDataSaving}
                isEditable
                saveMsg={tabIndex ? "Preferences" : "Details"}
            >
                <Tabs
                    size="md"
                    variant="line"
                    onChange={(idx) => setTabIndex(idx)}
                    isFitted
                    isLazy
                >
                    <TabList>
                        <Tab>Details</Tab>
                        <Tab isDisabled={!complete}>
                            <HStack gap={2}>
                                <Text>Preferences</Text>
                                {!complete && (
                                    <CompleteStatusBadge complete={complete} />
                                )}
                            </HStack>
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <EditProfessorForm
                                handleSubmit={submitDetailsData}
                                professor={professor}
                                disabled={!isEditing}
                            />
                        </TabPanel>
                        <TabPanel>
                            <AdminPreferences
                                professor={professor}
                                isDisabled={!isEditing}
                                handleSubmit={submitPreferencesData}
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Sidesheet>
            <DeleteConfirmation
                isOpen={deleteOpen}
                onClose={deleteOnClose}
                onDelete={onDelete}
                title={`professor ${firstName} ${lastName}`}
                isLoading={isDeleteLoading}
            />
        </>
    );
};

export default ProfessorSidesheet;
