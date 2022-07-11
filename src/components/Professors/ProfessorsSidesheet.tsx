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
import React, { useState } from "react";

import AdminPreferences from "@components/Preferences/AdminPreferences";
import Sidesheet from "../Layout/Sidesheet";
import DeleteConfirmation from "@components/Layout/DeleteConfirmation";
import { useDeleteQuery } from "@hooks/useRequest";
import EditProfessorForm from "./EditProfessorForm";
import { CompleteStatusBadge } from "@components/CompleteStatusBadge";

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

    const { execute: executeDelete, isLoading: isDeleteLoading } =
        useDeleteQuery(`/api/users/${username}/`);

    const onEdit = () => {
        setIsEditing(true);
    };

    const onCancel = () => {
        setIsEditing(false);
    };

    const handleClose = () => {
        onClose();
        setIsEditing(false);
        setTabIndex(0);
    };

    const onDelete = () => {
        executeDelete()
            .then((response) => {
                refetch();
                toast({
                    title: "Professor Deleted",
                    status: "warning",
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

    const isPengText = isPeng ? " | Peng" : "";

    const formArray = ["edit-professor-form", "preferences-form"];

    return (
        <>
            <Sidesheet
                size="xl"
                title={`${firstName} ${lastName}`}
                subTitle={`${email} | ${type}${isPengText}`}
                submitLabel="Edit"
                formId={formArray[tabIndex]}
                onEdit={onEdit}
                onCancel={onCancel}
                onDelete={deleteOnOpen}
                onClose={handleClose}
                isOpen={isOpen}
                isEditing={isEditing}
                isLoading={false}
                isEditable
            >
                <Tabs
                    size="md"
                    variant="line"
                    onChange={(idx) => setTabIndex(idx)}
                    isFitted
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
                                professor={professor}
                                disabled={!isEditing}
                                refetch={refetch}
                            />
                        </TabPanel>
                        <TabPanel>
                            <AdminPreferences
                                professor={professor}
                                isDisabled={!isEditing}
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Sidesheet>
            <DeleteConfirmation
                isOpen={deleteOpen}
                onClose={deleteOnClose}
                onDelete={onDelete}
                title={"Professor " + `${firstName} ${lastName}`}
                isLoading={isDeleteLoading}
            />
        </>
    );
};

export default ProfessorSidesheet;
