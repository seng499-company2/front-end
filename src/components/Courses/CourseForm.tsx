import {
    FormControl,
    FormLabel,
    Input,
    VStack,
    Flex,
    Checkbox,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import NumInput from "@components/NumInput";
import { SemesterBadges } from "@components/SemesterBadges";
import Table from "@components/Table";
import { useMemo, useState } from "react";

const AddCourseForm = (props) => {
    const { handleSubmit, formId, data, disabled } = props;
    const [numSections, setNumSections] = useState({
        fall: data?.sections?.fall.length || 1,
        spring: data?.sections?.spring.length || 1,
        summer: data?.sections?.summer.length || 1,
    });

    const getSectionFields = (sections, numSectionsTerm, setFieldValue) => {
        const sectionsTerm = [];
        for (let i = 0; i < numSectionsTerm; i++)
            sectionsTerm.push({
                section: i + 1,
                capacity: (
                    <NumInput
                        name={`sections.fall[${i}].capacity`}
                        min={0}
                        defaultValue={
                            sections[i]?.capacity ||
                            data?.sections?.fall[i].capacity ||
                            0
                        }
                        onChange={(v) =>
                            setFieldValue(`sections.fall[${i}].capacity`, v)
                        }
                        isDisabled={disabled}
                    />
                ),
                max_capacity_limit: (
                    <NumInput
                        name={`sections.fall[${i}].max_capacity_limit`}
                        min={0}
                        defaultValue={
                            sections[i]?.max_capacity_limit ||
                            data?.sections?.fall[i].max_capacity_limit ||
                            0
                        }
                        onChange={(v) =>
                            setFieldValue(
                                `sections.fall[${i}].max_capacity_limit`,
                                v
                            )
                        }
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
                sections: {
                    fall: data?.sections?.fall || [
                        { section: 1, capacity: 0, max_capacity_limit: 0 },
                    ],
                    spring: data?.sections?.spring || [
                        { section: 1, capacity: 0, max_capacity_limit: 0 },
                    ],
                    summer: data?.sections?.summer || [
                        { section: 1, capacity: 0, max_capacity_limit: 0 },
                    ],
                },
                yearRequired: data?.yearRequired || 0,
                pengRequired: {
                    fall: data?.pengRequired.fall || false,
                    spring: data?.pengRequired.spring || false,
                    summer: data?.pengRequired.summer || false,
                },
                fall_offering: data?.fall_offering || false,
                spring_offering: data?.spring_offering || false,
                summer_offering: data?.summer_offering || false,
            }}
            onSubmit={(values) => {
                console.log(values);
                handleSubmit(values);
            }}
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
                            />
                        </FormControl>

                        <FormControl isRequired={true}>
                            <FormLabel>Year Required</FormLabel>
                            <NumInput
                                name="yearRequired"
                                max={4}
                                min={0}
                                defaultValue={data?.yearRequired || 0}
                                onChange={(v) =>
                                    setFieldValue("yearRequired", v)
                                }
                                isDisabled={disabled}
                            />
                        </FormControl>
                        <FormControl isRequired={true}>
                            <FormLabel>Number of Sections</FormLabel>
                            <NumInput
                                max={3}
                                min={1}
                                value={numSections.fall}
                                onChange={(_, v) =>
                                    setNumSections({
                                        ...numSections,
                                        ["fall"]: v,
                                    })
                                }
                                isDisabled={disabled}
                            />
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
                                        Header: "Max Capacity Limit",
                                        accessor: "max_capacity_limit",
                                        disableSortBy: true,
                                        disableFilterBy: true,
                                    },
                                ]}
                                data={useMemo(
                                    () =>
                                        getSectionFields(
                                            values.sections["fall"],
                                            numSections["fall"],
                                            setFieldValue
                                        ),
                                    [values, numSections, setFieldValue]
                                )}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>PENG Required</FormLabel>
                            <Flex direction="column">
                                <Field
                                    as={Checkbox}
                                    name="pengRequired.fall"
                                    defaultChecked={data?.pengRequired.fall}
                                    disabled={disabled}
                                >
                                    Fall
                                </Field>
                                <Field
                                    as={Checkbox}
                                    name="pengRequired.spring"
                                    defaultChecked={data?.pengRequired.spring}
                                    disabled={disabled}
                                >
                                    Spring
                                </Field>
                                <Field
                                    as={Checkbox}
                                    name="pengRequired.summer"
                                    defaultChecked={data?.pengRequired.summer}
                                    disabled={disabled}
                                >
                                    Summer
                                </Field>
                            </Flex>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Course Offered</FormLabel>
                            <Flex direction="column" gap={1}>
                                <Field
                                    as={Checkbox}
                                    name="fall_offering"
                                    defaultChecked={data?.fall_offering}
                                    disabled={disabled}
                                >
                                    <SemesterBadges semesters={["fall"]} />
                                </Field>
                                <Field
                                    as={Checkbox}
                                    name="spring_offering"
                                    defaultChecked={data?.spring_offering}
                                    disabled={disabled}
                                >
                                    <SemesterBadges semesters={["spring"]} />
                                </Field>
                                <Field
                                    as={Checkbox}
                                    name="summer_offering"
                                    defaultChecked={data?.summer_offering}
                                    disabled={disabled}
                                >
                                    <SemesterBadges semesters={["summer"]} />
                                </Field>
                            </Flex>
                        </FormControl>
                    </VStack>
                </Form>
            )}
        </Formik>
    );
};

export default AddCourseForm;
