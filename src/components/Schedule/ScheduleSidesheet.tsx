import Sidesheet from "../Layout/Sidesheet";
import { useState } from "react";

import { useToast } from "@chakra-ui/react";

import { useGetQuery } from "@hooks/useRequest";
import ScheduleForm from "./ScheduleForm";

export const ScheduleSidesheet = ({ isOpen, onClose, data }) => {
    const [isEditing, setIsEditing] = useState(false);
    const toast = useToast();
    const {
        data: profData,
        isLoading,
        isError,
        execute,
    } = useGetQuery(`/api/users`, {
        useCache: false,
    });

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
                //isLoading={isDataSaving}
                isEditable
            >
                <ScheduleForm
                    data={data}
                    profData={profData}
                    isEditing={isEditing}
                    formId="edit-section-form"
                />
            </Sidesheet>
        </>
    );
};

export default ScheduleSidesheet;
