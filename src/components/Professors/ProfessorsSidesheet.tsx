import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import AdminPreferences from "@components/Preferences/AdminPreferences";
import PreferencesFormWrapper from "@components/Preferences/PreferencesFormWrapper";
import Sidesheet from "../Layout/Sidesheet";
import React, { useState } from "react";
import PreferencesForm from "../Preferences/PreferencesForm";
import DeleteConfirmation from "@components/Layout/DeleteConfirmation";
import { useGetQuery, usePostQuery, useDeleteQuery } from "@hooks/useRequest";
import { useToast, useDisclosure } from "@chakra-ui/react";
import AddProfessorForm from "./AddProfessorForm";

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

    const [isEditing, setIsEditing] = useState(false);
    const {
        isOpen: deleteOpen,
        onOpen: deleteOnOpen,
        onClose: deleteOnClose,
    } = useDisclosure();
    const toast = useToast();

    const { data, execute } = useGetQuery(`/api/preferences/${username}`);
    const { execute: executeDelete, isLoading: isDeleteLoading } =
        useDeleteQuery(`/api/users/${username}/`);
    const { execute: executeEdit, isLoading: isDataSaving } = usePostQuery(
        `/api/preferences/${username}/`
    );

    const onEdit = () => {
        setIsEditing(true);
    };

    const onSubmit = () => {
        setIsEditing(false);
    };

    const onCancel = () => {
        setIsEditing(false);
    };

    const onDelete = () => {
        executeDelete()
            .then((response) => {
                execute();
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

    return (
        <>
            <Sidesheet
                size="xl"
                title={`${firstName} ${lastName}`}
                subTitle={`${email} | ${type}${isPengText}`}
                submitLabel="Edit"
                formId="prof-form"
                onEdit={onEdit}
                onSubmit={onSubmit}
                onCancel={onCancel}
                onDelete={deleteOnOpen}
                onClose={onClose}
                isOpen={isOpen}
                isEditing={isEditing}
                isLoading={isDataSaving}
                isEditable
            >
                <Tabs size="md" variant="line">
                    <TabList>
                        <Tab>Details</Tab>
                        <Tab>Preferences</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <AddProfessorForm />
                        </TabPanel>
                        <TabPanel>
                            <AdminPreferences professor={professor} />
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

const initialValues = {
    //mock data
    numCoursesPerSem: {
        fall: 0,
        spring: 3,
        summer: 2,
    },
    // relief: {
    //     value: false,
    //     numCourses: 0,
    // },
    sabbatical: {
        value: true,
        duration: "half",
        fromMonth: "january",
    },
    teachingDaysPerWeek: {
        fall: 0,
        spring: 2,
        summer: 3,
    },
    preferredDaysFall: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
    },
    preferredDaysSpring: {
        monday: true,
        tuesday: false,
        wednesday: false,
        thursday: true,
        friday: false,
    },
    preferredDaysSummer: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: false,
        friday: false,
    },
    preferredTime: {
        fall: [
            {
                day: 1,
                time: 8,
            },
            {
                day: 1,
                time: 9,
            },
            {
                day: 1,
                time: 10,
            },
            {
                day: 1,
                time: 11,
            },
            {
                day: 1,
                time: 12,
            },
            {
                day: 4,
                time: 8,
            },
            {
                day: 4,
                time: 9,
            },
            {
                day: 4,
                time: 10,
            },
            {
                day: 4,
                time: 11,
            },
            {
                day: 4,
                time: 12,
            },
        ],
        summer: [
            {
                day: 1,
                time: 12,
            },
            {
                day: 1,
                time: 13,
            },
            {
                day: 1,
                time: 14,
            },
            {
                day: 1,
                time: 15,
            },
            {
                day: 1,
                time: 16,
            },
            {
                day: 4,
                time: 12,
            },
            {
                day: 4,
                time: 13,
            },
            {
                day: 4,
                time: 14,
            },
            {
                day: 4,
                time: 15,
            },
            {
                day: 4,
                time: 16,
            },
        ],
        spring: [],
    },
    coursePreferences: {
        "CSC 225": {
            willingness: 1,
            difficulty: 2,
        },
        "CSC 226": {
            willingness: 0,
            difficulty: 0,
        },
        "ECE 260": {
            willingness: 2,
            difficulty: 2,
        },
        "ECE 310": {
            willingness: 1,
            difficulty: 0,
        },
        "SENG 265": {
            willingness: 0,
            difficulty: 1,
        },
        "SENG 310": {
            willingness: 1,
            difficulty: 2,
        },
    },
};
