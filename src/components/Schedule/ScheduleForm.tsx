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
import { useEffect, useMemo, useState } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const ScheduleForm = ({ data, profData, isEditing, formId, handleSubmit }) => {
    const [sectionData, setSectionData] = useState(
        data.sections[data?.section]
    );

    const changeScheduledDays = (e) => {
        const value = e.target.name;
        let included = false;
        sectionData.timeSlots.forEach((slot) => {
            if (slot.dayOfWeek === value) {
                included = true;
            }
        });
        let tempArr = JSON.parse(JSON.stringify(sectionData));
        if (included) {
            tempArr.timeSlots = tempArr.timeSlots.filter(
                (slot) => slot.dayOfWeek !== value
            );
        } else {
            tempArr.timeSlots.push({
                dayOfWeek: value,
                timeRange: ["00:00", "00:00"],
            });
        }
        setSectionData(tempArr);
    };

    const handleTimeChange = (e, index, type) => {
        const v = e.target.value;
        setSectionData({
            ...sectionData,
            timeSlots: Object.values({
                ...sectionData.timeSlots,
                [index]: {
                    ...sectionData.timeSlots[index],
                    timeRange: Object.values({
                        ...sectionData.timeSlots[index].timeRange,
                        [type]: v,
                    }),
                },
            }),
        });
    };

    // const otherSections = useMemo(() => {
    //     const copyArr = data.sections;
    //     copyArr.splice(data.section);
    //     return copyArr;
    // }, [data.section, data.sections]);

    return (
        <Formik
            initialValues={{
                code: data.course.code,
                sectionId: data.section,
                professor: {
                    id: sectionData.professor.id,
                    name: sectionData.professor.name,
                },
                capacity: sectionData.capacity,
                maxCapacity: sectionData.maxCapacity,
                timeSlots: sectionData.timeSlots,
            }}
            onSubmit={(values) => {
                handleSubmit(values, sectionData.timeSlots);
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
                                <option
                                    key={"static prof"}
                                    value={"static prof"}
                                >
                                    {"Static Professor"}
                                </option>
                                {profData?.map((prof) => (
                                    <option
                                        key={
                                            prof?.user?.first_name +
                                            " " +
                                            prof?.user?.last_name
                                        }
                                        value={
                                            prof?.user?.first_name +
                                            " " +
                                            prof?.user?.last_name
                                        }
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
                            onChange={changeScheduledDays}
                        />
                        {sectionData.timeSlots.map((slot, index) => {
                            return (
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
                                            <FormLabel mb={0}>
                                                Starts at
                                            </FormLabel>
                                            <Field
                                                as={Input}
                                                name={`timeSlots.${index}.timeRange.${0}`}
                                                disabled={!isEditing}
                                                value={
                                                    sectionData.timeSlots[index]
                                                        .timeRange[0]
                                                }
                                                onChange={(v) =>
                                                    handleTimeChange(
                                                        v,
                                                        index,
                                                        0
                                                    )
                                                }
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

                                        <FormControl
                                            width={100}
                                            isInvalid={
                                                errors?.timeSlots &&
                                                !!errors?.timeSlots[index]
                                                    ?.timeRange[1]
                                            }
                                        >
                                            <FormLabel mb={0}>
                                                Ends at
                                            </FormLabel>
                                            <Field
                                                as={Input}
                                                name={`timeSlots.${index}.timeRange.${1}`}
                                                disabled={!isEditing}
                                                value={
                                                    sectionData.timeSlots[index]
                                                        .timeRange[1]
                                                }
                                                onChange={(v) =>
                                                    handleTimeChange(
                                                        v,
                                                        index,
                                                        1
                                                    )
                                                }
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
                                        </FormControl>
                                    </HStack>
                                </div>
                            );
                        })}

                        {/* <Heading size="sm">
                            Other Sections Current Semester
                        </Heading>
                        {otherSections.map((section) => (
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
