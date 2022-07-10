import Sidesheet from "../Layout/Sidesheet";
import React, { useState, useEffect } from "react";
import PreferencesForm from "../Preferences/PreferencesForm";
import { useGetQuery, usePostQuery } from "@hooks/useRequest";

export const ProfessorSidesheet = ({ isOpen, onClose, professor }) => {
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
    const [isDisabled, Edit] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

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

    const onEdit = () => {
        setIsEditing(true);
    };

    const onSubmit = () => {
        setIsEditing(false);
    };

    const onCancel = () => {
        setIsEditing(false);
    };

    const isPengText = isPeng ? " | Peng" : "";

    return (
        <Sidesheet
            size="xl"
            title={`${firstName} ${lastName}`}
            subTitle={`${email} | ${type}${isPengText}`}
            submitLabel="Edit"
            formId="prof-form"
            onEdit={onEdit}
            onSubmit={onSubmit}
            onCancel={onCancel}
            onClose={onClose}
            isOpen={isOpen}
            isEditing={isEditing}
            //isLoading={isDataSaving}
            isEditable
        >
            <PreferencesForm
                isDisabled={!isEditing}
                initialValues={initialValues}
            />
        </Sidesheet>
    );
};

export default ProfessorSidesheet;
