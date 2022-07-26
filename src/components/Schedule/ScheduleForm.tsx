import {
    FormControl,
    FormLabel,
    Flex,
    HStack,
    VStack,
    Select,
    Heading,
    Tag,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import OtherSection from "./OtherSection";

import NumInput from "@components/NumInput";
import EditDaysControl from "./EditDaysControl";
import { useMemo } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

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

const ScheduleForm = ({ data, profData, isEditing, formId }) => {
    const handleSubmit = (values) => {
        console.log(values);
    };

    // const otherSections = useMemo(() => {
    //     const copyArr = data.sections;
    //     copyArr.splice(data.section);
    //     return copyArr;
    // }, [data.section, data.sections]);

    const sectionData = data.sections[data?.section];
    return (
        <Formik
            initialValues={{
                professor: {
                    id: sectionData.professor.id,
                    name: sectionData.professor.name,
                },
                capacity: sectionData.capacity,
                maxCapacity: sectionData.maxCapacity,
                timeSlots: sectionData.timeSlots,
            }}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
        >
            {({ setFieldValue }) => (
                <Form id={formId}>
                    <VStack align="left" gap={2}>
                        <Heading size="sm">Section Details</Heading>
                        <FormControl>
                            <FormLabel>Professor</FormLabel>
                            <Field
                                as={Select}
                                name="professor.name"
                                disabled={!isEditing}
                            >
                                {profData?.map((prof) => (
                                    <option
                                        key={prof?.user?.username}
                                        value={prof?.user?.username}
                                    >
                                        {prof?.user?.first_name +
                                            " " +
                                            prof?.user?.last_name}
                                    </option>
                                ))}
                            </Field>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Capacity</FormLabel>
                            <NumInput
                                name="capacity"
                                max={1000}
                                min={0}
                                defaultValue={sectionData.capacity || 1}
                                onChange={(v) => setFieldValue("capacity", v)}
                                isDisabled={!isEditing}
                            />
                        </FormControl>
                        <Heading size="sm">Time Slots</Heading>

                        <EditDaysControl
                            timeslots={sectionData.timeSlots}
                            isThick={true}
                            disabled={!isEditing}
                        />
                        {sectionData.timeSlots.map((slot) => (
                            <div key={slot.dayOfWeek}>
                                <Tag
                                    colorScheme="blue"
                                    color="black"
                                    mb={2}
                                    mt={3}
                                >
                                    {slot.dayOfWeek.charAt(0) +
                                        slot.dayOfWeek
                                            .substring(1)
                                            .toLowerCase() +
                                        " Time Slot"}
                                </Tag>
                                <HStack>
                                    <VStack align="left">
                                        <FormLabel mb={0}>Starts at</FormLabel>
                                        <HStack mt={0}>
                                            <Field
                                                as={Select}
                                                name="professor.name"
                                                disabled={!isEditing}
                                                width={100}
                                            >
                                                {hours.map((hour) => (
                                                    <option
                                                        value={hour}
                                                        key={hour}
                                                    >
                                                        {hour}
                                                    </option>
                                                ))}
                                            </Field>

                                            <FormLabel>:</FormLabel>
                                            <Field
                                                as={Select}
                                                name="professor.name"
                                                disabled={!isEditing}
                                                width={100}
                                            >
                                                {startMinutes.map((minute) => (
                                                    <option
                                                        value={minute}
                                                        key={minute}
                                                    >
                                                        {minute}
                                                    </option>
                                                ))}
                                            </Field>
                                        </HStack>
                                    </VStack>
                                    <div>
                                        <ArrowForwardIcon w={6} h={6} mt={9} />
                                    </div>
                                    <VStack align="left">
                                        <FormLabel mb={0}>Ends at</FormLabel>
                                        <HStack mt={0}>
                                            <Field
                                                as={Select}
                                                name="professor.name"
                                                disabled={!isEditing}
                                                width={100}
                                            >
                                                {hours.map((hour) => (
                                                    <option
                                                        value={hour}
                                                        key={hour}
                                                    >
                                                        {hour}
                                                    </option>
                                                ))}
                                            </Field>

                                            <FormLabel>:</FormLabel>
                                            <Field
                                                as={Select}
                                                name="professor.name"
                                                disabled={!isEditing}
                                                width={100}
                                            >
                                                {endMinutes.map((minute) => (
                                                    <option
                                                        value={minute}
                                                        key={minute}
                                                    >
                                                        {minute}
                                                    </option>
                                                ))}
                                            </Field>
                                        </HStack>
                                    </VStack>
                                </HStack>
                            </div>
                        ))}

                        <Heading size="sm">
                            Other Sections Current Semester
                        </Heading>
                        {/* {otherSections.map((section) => (
                            <OtherSection
                                key={section.section}
                                data={section}
                            />
                        ))} */}
                    </VStack>
                </Form>
            )}
        </Formik>
    );
};

export default ScheduleForm;
