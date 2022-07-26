import {
    FormControl,
    FormLabel,
    Input,
    VStack,
    Flex,
    Checkbox,
    Box,
    Spacer,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import NumInput from "@components/NumInput";
import { SemesterBadges } from "@components/SemesterBadges";
import Table from "@components/Table";
import { useEffect, useMemo, useState } from "react";

const AddCourseForm = (props) => {
    const { handleSubmit, formId, data, disabled } = props;
    const [numSections, setNumSections] = useState({
        fall: data?.fall_sections?.length || 1,
        spring: data?.spring_sections?.length || 1,
        summer: data?.summer_sections?.length || 1,
    });
    const [offerings, setOfferings] = useState({
        fall: data?.fall_sections.length > 0 || false,
        spring: data?.spring_sections.length > 0 || false,
        summer: data?.summer_sections.length > 0 || false,
    });

    console.log(data);

    const increaseNumSections = (term, v, values) => {
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
                    <NumInput
                        name={`${term}_sections[${i}].capacity`}
                        min={0}
                        defaultValue={
                            sections[i]?.capacity ||
                            data?.sections?.[term][i]?.capacity ||
                            0
                        }
                        onChange={(_, v) =>
                            setFieldValue(`${term}_sections[${i}].capacity`, v)
                        }
                        isDisabled={disabled}
                    />
                ),
                maxCapacity: (
                    <NumInput
                        name={`${term}_sections[${i}].maxCapacity`}
                        min={0}
                        defaultValue={
                            sections[i]?.maxCapacity ||
                            data?.sections?.[term][i]?.maxCapacity ||
                            0
                        }
                        onChange={(_, v) =>
                            setFieldValue(
                                `${term}_sections[${i}].maxCapacity`,
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
                fall_sections: data?.fall_sections || [
                    {
                        capacity: 0,
                        maxCapacity: 0,
                        professor: null,
                        timeSlots: [],
                    },
                ],
                spring_sections: data?.spring_sections || [
                    {
                        capacity: 0,
                        maxCapacity: 0,
                        professor: null,
                        timeSlots: [],
                    },
                ],
                summer_sections: data?.summer_sections || [
                    {
                        capacity: 0,
                        maxCapacity: 0,
                        professor: null,
                        timeSlots: [],
                    },
                ],
                yearRequired: data?.yearRequired || 0,
                pengRequired: {
                    fall: data?.pengRequired.fall || false,
                    spring: data?.pengRequired.spring || false,
                    summer: data?.pengRequired.summer || false,
                },
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
                        <FormControl>
                            <FormLabel>Course Offered</FormLabel>
                            <Flex direction="row" gap={6}>
                                <Checkbox
                                    isChecked={offerings.fall}
                                    onChange={(e) =>
                                        setOfferings({
                                            ...offerings,
                                            fall: e.target.checked,
                                        })
                                    }
                                    disabled={disabled}
                                >
                                    <SemesterBadges semesters={["fall"]} />
                                </Checkbox>
                                <Checkbox
                                    isChecked={offerings.spring}
                                    onChange={(e) =>
                                        setOfferings({
                                            ...offerings,
                                            spring: e.target.checked,
                                        })
                                    }
                                    disabled={disabled}
                                >
                                    <SemesterBadges semesters={["spring"]} />
                                </Checkbox>
                                <Checkbox
                                    isChecked={offerings.summer}
                                    onChange={(e) =>
                                        setOfferings({
                                            ...offerings,
                                            summer: e.target.checked,
                                        })
                                    }
                                    disabled={disabled}
                                >
                                    <SemesterBadges semesters={["summer"]} />
                                </Checkbox>
                            </Flex>
                        </FormControl>
                        {["fall", "spring", "summer"].map(
                            (term) =>
                                offerings[term] && (
                                    <FormControl key={term}>
                                        <Flex direction="row">
                                            <Box>
                                                <FormLabel>
                                                    Number of Sections in{" "}
                                                    {term
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        term.slice(1)}
                                                    :
                                                </FormLabel>
                                                <NumInput
                                                    max={3}
                                                    min={1}
                                                    value={numSections[term]}
                                                    onChange={(_, v) =>
                                                        increaseNumSections(
                                                            term,
                                                            v,
                                                            values
                                                        )
                                                    }
                                                    isDisabled={disabled}
                                                />
                                            </Box>
                                            <Spacer />
                                            <Box>
                                                <FormLabel>
                                                    PENG Required
                                                </FormLabel>
                                                <Field
                                                    as={Checkbox}
                                                    name={`pengRequired.${term}`}
                                                    defaultChecked={
                                                        data?.pengRequired[term]
                                                    }
                                                    disabled={disabled}
                                                >
                                                    Fall
                                                </Field>
                                            </Box>
                                        </Flex>
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
                                    </FormControl>
                                )
                        )}
                    </VStack>
                </Form>
            )}
        </Formik>
    );
};

export default AddCourseForm;
