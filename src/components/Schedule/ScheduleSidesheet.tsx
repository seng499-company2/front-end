import Sidesheet from "../Layout/Sidesheet";
import { useState } from "react";
import { usePostQuery } from "@hooks/useRequest";
import { useToast, useDisclosure } from "@chakra-ui/react";
import OtherSection from "./OtherSection";

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
                <OtherSection data={{}} />
            </Sidesheet>
        </>
    );
};

export default ScheduleSidesheet;
