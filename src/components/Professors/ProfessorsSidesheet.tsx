import {
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    useToast,
    useDisclosure,
} from "@chakra-ui/react";
import AdminPreferences from "@components/Preferences/AdminPreferences";
import Sidesheet from "../Layout/Sidesheet";
import React, { useState } from "react";
import DeleteConfirmation from "@components/Layout/DeleteConfirmation";
import { useGetQuery, usePostQuery, useDeleteQuery } from "@hooks/useRequest";
import EditProfessorForm from "./EditProfessorForm";

export const ProfessorSidesheet = ({ isOpen, onClose, professor, refetch }) => {
    const {
        isPeng,
        type,
        complete,
        firstName,
        lastName,
        isAdmin,
        email,
        username,
    } = professor;

    const [tabIndex, setTabIndex] = useState(1);
    const [isEditing, setIsEditing] = useState(false);
    const {
        isOpen: deleteOpen,
        onOpen: deleteOnOpen,
        onClose: deleteOnClose,
    } = useDisclosure();
    const toast = useToast();

    const { execute: executeDelete, isLoading: isDeleteLoading } =
        useDeleteQuery(`/api/users/${username}/`);
    const { execute: executeEditPref, isLoading: isDataSaving } = usePostQuery(
        `/api/preferences/${username}/`
    );
    const { execute: executeEditDetail, isLoading: isDetailSaving } =
        usePostQuery(`/api/users/${username}/`);
    const { isError, isLoading, execute } = usePostQuery("/api/users/");

    const onEdit = () => {
        setIsEditing(true);
    };

    const onSubmit = () => {
        setIsEditing(false);
    };

    const onCancel = () => {
        setIsEditing(false);
    };

    const handleClose = () => {
        onClose();
        setIsEditing(false);
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

    const onSubmitPreferences = (values) => {
        console.log({ values });
        executeEditPref({
            data: values,
        })
            .then((response) => {
                //refetch();
                toast({
                    title: "Professor Preferences Updated Successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left",
                });
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
        setIsEditing(false);
    };

    const isPengText = isPeng ? " | Peng" : "";

    return (
        <>
            <Sidesheet
                size="xl"
                title={`${firstName} ${lastName}`}
                subTitle={`${email} | ${type}${isPengText}`}
                submitLabel="Edit"
                formId="prof-form"
                onEdit={onEdit}
                //onSubmit={onSubmitPreferences}
                onCancel={onCancel}
                onDelete={deleteOnOpen}
                onClose={handleClose}
                isOpen={isOpen}
                isEditing={isEditing}
                isLoading={isDataSaving}
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
                        <Tab>Preferences</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <EditProfessorForm
                                professor={professor}
                                disabled={!isEditing || isDetailSaving}
                                refetch={refetch}
                            />
                        </TabPanel>
                        <TabPanel>
                            <AdminPreferences
                                professor={professor}
                                isDisabled={!isEditing || isDataSaving}
                                //onSubmit={onSubmitPreferences}
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
