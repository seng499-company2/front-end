import Sidesheet from "../Layout/Sidesheet";
import { useState } from "react";
import { usePostQuery } from "@hooks/useRequest";
import { useToast, useDisclosure, Heading } from "@chakra-ui/react";
import OtherSection from "./OtherSection";
import EditDaysControl from "./EditDaysControl";

export const ScheduleSidesheet = ({ isOpen, onClose, section, refetch }) => {
    const [isEditing, setIsEditing] = useState(false);
    const toast = useToast();

    // const { execute: executeEdit, isLoading: isDataSaving } = usePostQuery(
    //     "/api/course/" + course.course_code + "/"
    // );

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
                title={section?.section}
                subTitle={section?.course?.code}
                isOpen={isOpen}
                onClose={handleClose}
                onEdit={onEdit}
                onCancel={onCancel}
                formId="edit-section-form"
                isEditing={isEditing}
                //isLoading={isDataSaving}
                isEditable
            >
                <Heading size="sm" mb={5}>
                    Section Details
                </Heading>
                <EditDaysControl />

                <Heading size="sm" mb={5}>
                    Other Sections Current Semester
                </Heading>
                {section?.otherSections?.map((section) => (
                    <OtherSection key={section.section} data={section} />
                ))}
            </Sidesheet>
        </>
    );
};

export default ScheduleSidesheet;
