import Sidesheet from "../Layout/Sidesheet";
import { useState } from "react";

import { useToast } from "@chakra-ui/react";

import { useGetQuery } from "@hooks/useRequest";
import ScheduleForm from "./ScheduleForm";
import useSchedule from "@hooks/useSchedule";

export const ScheduleSidesheet = ({ isOpen, onClose, data, semester }) => {
    const [isEditing, setIsEditing] = useState(false);
    const toast = useToast();
    const { data: profData } = useGetQuery(`/api/users`, {
        useCache: false,
    });

    const { saveSchedule, editCourse, rescheduleSection, isSaving } =
        useSchedule();

    const handleSubmit = (data, timeSlots) => {
        editCourse(data, semester);
        rescheduleSection(
            {
                courseCode: data.code,
                courseSectionId: data.sectionId,
                timeSlots: {
                    oldTimeSlots: [],
                    newTimeSlots: timeSlots,
                },
            },
            semester
        );
        saveSchedule();
        setIsEditing(false);
    };

    const onEdit = () => {
        setIsEditing(true);
    };

    const onCancel = () => {
        setIsEditing(false);
        onClose();
    };

    const handleClose = () => {
        onClose();
        setIsEditing(false);
    };

    return (
        <>
            <Sidesheet
                size="xl"
                title={"A0" + (data?.section + 1)}
                subTitle={data?.course?.code}
                isOpen={isOpen}
                onClose={handleClose}
                onEdit={onEdit}
                onCancel={onCancel}
                formId="edit-section-form"
                isEditing={isEditing}
                isLoading={isSaving}
                isEditable
            >
                <ScheduleForm
                    data={data}
                    profData={profData}
                    isEditing={isEditing}
                    formId="edit-section-form"
                    handleSubmit={handleSubmit}
                />
            </Sidesheet>
        </>
    );
};

export default ScheduleSidesheet;
