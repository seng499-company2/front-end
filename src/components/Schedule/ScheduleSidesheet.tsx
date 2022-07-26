import Sidesheet from "../Layout/Sidesheet";
import { useState } from "react";
import { usePostQuery } from "@hooks/useRequest";
import {
    useToast,
    useDisclosure,
    Heading,
    Select,
    HStack,
    VStack,
} from "@chakra-ui/react";
import OtherSection from "./OtherSection";
import EditDaysControl from "./EditDaysControl";
import { FormLabel } from "@chakra-ui/react";
import { useGetQuery } from "@hooks/useRequest";
import NumInput from "@components/NumInput";
import ScheduleForm from "./ScheduleForm";

const hours = [
    "08",
    "09",
    "10",
    "11",
    "12",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
];
const startMinutes = ["00", "30"];

const endMinutes = ["20", "50"];

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
