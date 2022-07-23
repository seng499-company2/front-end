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

export const ScheduleSidesheet = ({ isOpen, onClose, section, refetch }) => {
    const [isEditing, setIsEditing] = useState(false);
    const toast = useToast();
    const { data, isLoading, isError, execute } = useGetQuery(`/api/users`, {
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
                <VStack align="left" gap={2}>
                    <Heading size="sm">Section Details</Heading>
                    <FormLabel>Days</FormLabel>
                    <EditDaysControl isThick={true} disabled={!isEditing} />
                    <FormLabel>Starts At</FormLabel>
                    <HStack>
                        <Select width={100} disabled={!isEditing}>
                            {hours.map((hour) => (
                                <option value={hour} key={hour}>
                                    {hour}
                                </option>
                            ))}
                        </Select>
                        <FormLabel>:</FormLabel>
                        <Select width={100} disabled={!isEditing}>
                            {startMinutes.map((minute) => (
                                <option value={minute} key={minute}>
                                    {minute}
                                </option>
                            ))}
                        </Select>
                    </HStack>
                    <FormLabel>Ends At</FormLabel>
                    <HStack>
                        <Select width={100} disabled={!isEditing}>
                            {hours.map((hour) => (
                                <option value={hour} key={hour}>
                                    {hour}
                                </option>
                            ))}
                        </Select>
                        <FormLabel>:</FormLabel>
                        <Select width={100} disabled={!isEditing}>
                            {endMinutes.map((minute) => (
                                <option value={minute} key={minute}>
                                    {minute}
                                </option>
                            ))}
                        </Select>
                    </HStack>

                    <FormLabel>Professor</FormLabel>
                    <Select disabled={!isEditing}>
                        {data?.map((prof) => (
                            <option
                                key={prof?.user?.username}
                                value={prof?.user?.username}
                            >
                                {prof?.user?.first_name +
                                    " " +
                                    prof?.user?.last_name}
                            </option>
                        ))}
                    </Select>
                    <FormLabel>Capacity</FormLabel>
                    <NumInput
                        name="capacity"
                        max={1000}
                        min={0}
                        //defaultValue={data?.yearRequired || 0}
                        // onChange={(v) =>
                        //     setFieldValue("yearRequired", v)
                        // }
                        isDisabled={!isEditing}
                    />

                    <Heading size="sm">Other Sections Current Semester</Heading>
                    {section?.otherSections?.map((section) => (
                        <OtherSection key={section.section} data={section} />
                    ))}
                </VStack>
            </Sidesheet>
        </>
    );
};

export default ScheduleSidesheet;
