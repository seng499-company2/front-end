import {
    FormControl,
    FormLabel,
    Flex,
    HStack,
    VStack,
    Select,
    Heading,
    Tag,
    Input,
    FormErrorMessage,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import OtherSection from "./OtherSection";

import NumInput from "@components/NumInput";
import EditDaysControl from "./EditDaysControl";
import { useMemo } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const validateTime = (value) => {
    let errorMessage;
    if (!/[0-9]+:[0-9]+/i.test(value)) {
        errorMessage = "Invalid time";
    }
    return errorMessage;
};

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
            {({ setFieldValue, errors }) => (
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
                        {sectionData.timeSlots.map((slot, index) => (
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
                                    <FormControl
                                        width={100}
                                        mr={5}
                                        isInvalid={
                                            errors?.timeSlots &&
                                            !!errors?.timeSlots[index]
                                                ?.timeRange[0]
                                        }
                                    >
                                        <FormLabel mb={0}>Starts at</FormLabel>
                                        <Field
                                            as={Input}
                                            name={`timeSlots.${index}.timeRange.${0}`}
                                            disabled={!isEditing}
                                            validate={(value) => {
                                                let errorMessage;
                                                if (
                                                    !/^(1[0-2]|0?[1-9]):[0-5][0-9]$/i.test(
                                                        value
                                                    )
                                                ) {
                                                    errorMessage =
                                                        "Invalid time";
                                                }
                                                return errorMessage;
                                            }}
                                        ></Field>
                                    </FormControl>
                                    {/* <div>
                                        <ArrowForwardIcon w={6} h={6} mt={9} />
                                    </div> */}
                                    <FormControl
                                        width={100}
                                        isInvalid={
                                            errors?.timeSlots &&
                                            !!errors?.timeSlots[index]
                                                ?.timeRange[1]
                                        }
                                    >
                                        <FormLabel mb={0}>Ends at</FormLabel>
                                        <Field
                                            as={Input}
                                            name={`timeSlots.${index}.timeRange.${1}`}
                                            disabled={!isEditing}
                                            validate={(value) => {
                                                let errorMessage;
                                                if (
                                                    !/^(1[0-2]|0?[1-9]):[0-5][0-9]$/i.test(
                                                        value
                                                    )
                                                ) {
                                                    errorMessage =
                                                        "Invalid time";
                                                }
                                                return errorMessage;
                                            }}
                                        />
                                        {/* <FormErrorMessage>
                                            {
                                                errors?.timeSlots[index]
                                                    .timeRange[1]
                                            }
                                        </FormErrorMessage> */}
                                    </FormControl>
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
