import {
    FormControl,
    FormLabel,
    Input,
    VStack,
    Flex,
    Checkbox,
    Box,
    Spacer,
    Divider,
    Heading,
    Switch,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";

import NumInput from "@components/NumInput";
import { getSemesterColor, SemesterBadges } from "@components/SemesterBadges";
import Table from "@components/Table";
import { useState } from "react";

const CourseForm = (props) => {
    const { handleSubmit, formId, data, disabled } = props;
    const [numSections, setNumSections] = useState({
        fall: data?.fall_sections?.length || 1,
        spring: data?.spring_sections?.length || 1,
        summer: data?.summer_sections?.length || 1,
    });
    const [offerings, setOfferings] = useState({
        fall: !!data?.fall_sections.length || false,
        spring: !!data?.spring_sections.length || false,
        summer: !!data?.summer_sections.length || false,
    });

    const onCourseOfferedToggle = (term, isChecked, values) => {
        if (isChecked) {
            values[`${term}_sections`] = [
                {
                    capacity: 0,
                    maxCapacity: 0,
                    professor: null,
                    timeSlots: [],
                },
            ];
        } else {
            values.pengRequired[term] = false;
            setNumSections({ ...numSections, [term]: 1 });
            values[`${term}_sections`] = [];
        }
        setOfferings({ ...offerings, [term]: isChecked });
    };

    const changeNumSections = (term, v, values) => {
        if (v > values[`${term}_sections`].length) {
            for (let i = 0; i < v - values[`${term}_sections`].length; i++)
                values[`${term}_sections`].push({
                    professor: null,
                    capacity: 0,
                    maxCapacity: 0,
                    timeSlots: [],
                });
        } else if (v < values[`${term}_sections`].length) {
            for (let i = 0; i < values[`${term}_sections`].length - v; i++)
                values[`${term}_sections`].pop();
        }
        setNumSections({
            ...numSections,
            [term]: v,
        });
    };

    const getSectionFields = (
        term,
        sections,
        numSectionsTerm,
        setFieldValue
    ) => {
        const sectionsTerm = [];
        for (let i = 0; i < numSectionsTerm; i++)
            sectionsTerm.push({
                section: `A0${i + 1}`,
                capacity: (
                    <Field
                        as={NumInput}
                        name={`${term}_sections[${i}].capacity`}
                        min={0}
                        defaultValue={
                            sections[i]?.capacity ||
                            data?.sections?.[term][i]?.capacity ||
                            0
                        }
                        onChange={(_, v) => {
                            setFieldValue(`${term}_sections[${i}].capacity`, v);
                            setFieldValue(
                                `${term}_sections[${i}].maxCapacity`,
                                0
                            );
                        }}
                        isDisabled={disabled}
                    />
                ),
                maxCapacity: (
                    <Field
                        as={NumInput}
                        name={`${term}_sections[${i}].maxCapacity`}
                        min={0}
                        defaultValue={
                            sections[i]?.maxCapacity ||
                            data?.sections?.[term][i]?.maxCapacity ||
                            0
                        }
                        onChange={(_, v) => {
                            setFieldValue(`${term}_sections[${i}].capacity`, 0);
                            setFieldValue(
                                `${term}_sections[${i}].maxCapacity`,
                                v
                            );
                        }}
                        isDisabled={disabled}
                    />
                ),
            });
        return sectionsTerm;
    };

    return (
        <Formik
            initialValues={{
                course_code: data?.course_code ?? "",
                course_title: data?.course_title ?? "",
                fall_sections: data?.fall_sections || [],
                spring_sections: data?.spring_sections || [],
                summer_sections: data?.summer_sections || [],
                yearRequired: data?.yearRequired || 1,
                pengRequired: {
                    fall: data?.pengRequired.fall || false,
                    spring: data?.pengRequired.spring || false,
                    summer: data?.pengRequired.summer || false,
                },
            }}
            onSubmit={(values) => handleSubmit(values)}
        >
            {({ values, setFieldValue }) => (
                <Form id={formId}>
                    <VStack spacing={4} align="flex-start">
                        {!data && (
                            <FormControl isRequired={true}>
                                <FormLabel>Course Code</FormLabel>
                                <Field
                                    as={Input}
                                    name="course_code"
                                    variant="filled"
                                />
                            </FormControl>
                        )}
                        <FormControl isRequired={true}>
                            <FormLabel>Course Name</FormLabel>
                            <Field
                                as={Input}
                                name="course_title"
                                variant="filled"
                                disabled={disabled}
                                //_disabled={{ opacity: 0.8 }}
                            />
                        </FormControl>

                        <FormControl isRequired={true}>
                            <FormLabel>Year Required</FormLabel>
                            <NumInput
                                name="yearRequired"
                                max={4}
                                min={1}
                                defaultValue={data?.yearRequired || 1}
                                onChange={(v) =>
                                    setFieldValue("yearRequired", v)
                                }
                                isDisabled={disabled}
                            />
                        </FormControl>

                        <Divider />

                        <FormControl>
                            <FormLabel>Course Offered</FormLabel>
                            <Flex direction="row" gap={6}>
                                <Checkbox
                                    isChecked={offerings.fall}
                                    onChange={(e) =>
                                        onCourseOfferedToggle(
                                            "fall",
                                            e.target.checked,
                                            values
                                        )
                                    }
                                    disabled={disabled}
                                >
                                    <SemesterBadges
                                        semesters={["fall"]}
                                        textTransform="capitalize"
                                    />
                                </Checkbox>
                                <Checkbox
                                    isChecked={offerings.spring}
                                    onChange={(e) =>
                                        onCourseOfferedToggle(
                                            "spring",
                                            e.target.checked,
                                            values
                                        )
                                    }
                                    disabled={disabled}
                                >
                                    <SemesterBadges
                                        semesters={["spring"]}
                                        textTransform="capitalize"
                                    />
                                </Checkbox>
                                <Checkbox
                                    isChecked={offerings.summer}
                                    onChange={(e) =>
                                        onCourseOfferedToggle(
                                            "summer",
                                            e.target.checked,
                                            values
                                        )
                                    }
                                    disabled={disabled}
                                >
                                    <SemesterBadges
                                        semesters={["summer"]}
                                        textTransform="capitalize"
                                    />
                                </Checkbox>
                            </Flex>
                            <Divider my={4} />
                        </FormControl>
                        {["fall", "spring", "summer"].map(
                            (term) =>
                                offerings[term] && (
                                    <FormControl key={term} mt={"1rem"}>
                                        <SemesterBadges
                                            semesters={[term]}
                                            mb={4}
                                            textTransform="capitalize"
                                        />
                                        <Flex direction="row">
                                            <Box>
                                                <FormLabel>
                                                    Number of Sections
                                                </FormLabel>
                                                <NumInput
                                                    max={2}
                                                    min={1}
                                                    value={numSections[term]}
                                                    onChange={(_, v) =>
                                                        changeNumSections(
                                                            term,
                                                            v,
                                                            values
                                                        )
                                                    }
                                                    isDisabled={disabled}
                                                />
                                            </Box>
                                            <Spacer />
                                            <VStack>
                                                <FormLabel>
                                                    PENG Required
                                                </FormLabel>
                                                <Field
                                                    as={Switch}
                                                    name={`pengRequired.${term}`}
                                                    colorScheme={getSemesterColor(
                                                        term
                                                    )}
                                                    defaultChecked={
                                                        data?.pengRequired[term]
                                                    }
                                                    disabled={disabled}
                                                ></Field>
                                            </VStack>
                                        </Flex>
                                        <Box mt={"1rem"}>
                                            <FormLabel>
                                                Please indicate capacity or max
                                                capacity for each section
                                            </FormLabel>
                                            <Table
                                                columns={[
                                                    {
                                                        Header: "Section",
                                                        accessor: "section",
                                                        disableSortBy: true,
                                                        disableFilterBy: true,
                                                    },
                                                    {
                                                        Header: "Capacity",
                                                        accessor: "capacity",
                                                        disableSortBy: true,
                                                        disableFilterBy: true,
                                                    },
                                                    {
                                                        Header: "Max Capacity",
                                                        accessor: "maxCapacity",
                                                        disableSortBy: true,
                                                        disableFilterBy: true,
                                                    },
                                                ]}
                                                data={getSectionFields(
                                                    term,
                                                    values[`${term}_sections`],
                                                    numSections[term],
                                                    setFieldValue
                                                )}
                                            />
                                            <Divider my={8} />
                                        </Box>
                                    </FormControl>
                                )
                        )}
                    </VStack>
                </Form>
            )}
        </Formik>
    );
};

export default CourseForm;
