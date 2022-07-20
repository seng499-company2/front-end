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

const AddCourseForm = ({ handleSubmit, data, disabled }) => {
    return (
        <Formik
            initialValues={{
                course_code: data?.course_code ?? "",
                course_title: data?.course_title ?? "",
                num_sections: data?.num_sections || 1,
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
                handleSubmit(values);
            }}
        >
            {({ setFieldValue }) => (
                <Form id="edit-course-form">
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
                                name="num_sections"
                                max={3}
                                min={1}
                                defaultValue={data?.num_sections || 1}
                                onChange={(v) =>
                                    setFieldValue("num_sections", v)
                                }
                                isDisabled={disabled}
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
