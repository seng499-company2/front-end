import {
    Checkbox,
    HStack,
    Select,
    Text,
    FormControl,
    FormLabel,
    Flex,
    VStack,
} from "@chakra-ui/react";
import { Field } from "formik";
import NumInput from "../NumInput";

const Availability = (props) => {
    const { setFieldValue, values, isDisabled = false } = props;

    return (
        <VStack spacing={10} align="left">
            <FormControl>
                <FormLabel>
                    Preferred Number of Teaching Courses per Semester
                </FormLabel>
                <HStack align="left">
                    <Text alignSelf="center" mb={0}>
                        Fall
                    </Text>
                    <NumInput
                        name="numCoursesPerSem.fall"
                        isDisabled={isDisabled}
                        max={5}
                        min={0}
                        defaultValue={values.numCoursesPerSem.fall}
                        onChange={(v) =>
                            setFieldValue("numCoursesPerSem.fall", v)
                        }
                    />
                    <Text alignSelf="center" pl={10}>
                        Spring
                    </Text>
                    <NumInput
                        name="numCoursesPerSem.spring"
                        isDisabled={isDisabled}
                        max={5}
                        min={0}
                        defaultValue={values.numCoursesPerSem.spring}
                        onChange={(v) =>
                            setFieldValue("numCoursesPerSem.spring", v)
                        }
                    />
                    <Text alignSelf="center" pl={10}>
                        Summer
                    </Text>
                    <NumInput
                        name="numCoursesPerSem.summer"
                        isDisabled={isDisabled}
                        max={5}
                        min={0}
                        defaultValue={values.numCoursesPerSem.summer}
                        onChange={(v) =>
                            setFieldValue("numCoursesPerSem.summer", v)
                        }
                    />
                </HStack>
            </FormControl>
            {/* <FormControl>
                    <FormLabel>Select Relief Preferences</FormLabel>
                    <Field as={Checkbox} name="relief.value">
                        Taking relief
                    </Field>
                </FormControl> */}
            {/* <FormControl>
                    <HStack>
                        <FormLabel>If yes, How many courses are you teaching?</FormLabel>
                        <Field
                            as={Select}
                            name="relief.numCourses"
                            type="name"
                            colorScheme="primary"
                            variant="filled"
                        >
                            <option value='5'>5 Courses</option>
                            <option value="4">4 Courses</option>
                            <option value="3">3 Courses</option>
                            <option value="2">2 Courses</option>
                            <option value="1">1 Course</option>
                        </Field>
                    </HStack>
                </FormControl> */}
            <FormControl>
                <FormLabel>Sabbatical Preferences</FormLabel>
                <Field
                    as={Checkbox}
                    name="sabbatical.value"
                    isDisabled={isDisabled}
                    defaultChecked={values.sabbatical.value}
                >
                    Taking Sabbatical
                </Field>

                {values.sabbatical.value && (
                    <>
                        <Text mt={5}>Sabbatical Length</Text>
                        <Field
                            as={Select}
                            name="sabbatical.duration"
                            isDisabled={isDisabled}
                            colorScheme="primary.100"
                            variant="filled"
                            focusBorderColor="primary.500"
                        >
                            <option value="half">Half leave</option>
                            <option value="full">Full leave</option>
                        </Field>
                        <Text mt={5}>Sabbatical Start Month</Text>
                        <Field
                            as={Select}
                            name="sabbatical.fromMonth"
                            isDisabled={isDisabled}
                            colorScheme="primary"
                            variant="filled"
                        >
                            <option value="january">January</option>
                            <option value="may">May</option>
                            <option value="september">September</option>
                        </Field>
                    </>
                )}
            </FormControl>
            <FormControl>
                <FormLabel>Preferred Number of Teaching Days</FormLabel>
                <HStack align="left">
                    <Text alignSelf="center">Fall</Text>
                    <NumInput
                        name="teachingDaysPerWeek.fall"
                        isDisabled={
                            isDisabled || values.numCoursesPerSem.fall == 0
                        }
                        max={5}
                        min={0}
                        defaultValue={values.teachingDaysPerWeek.fall}
                        onChange={(v) =>
                            setFieldValue("teachingDaysPerWeek.fall", v)
                        }
                    />
                    <Text alignSelf="center" pl={10}>
                        Spring
                    </Text>
                    <NumInput
                        name="teachingDaysPerWeek.spring"
                        isDisabled={
                            isDisabled || values.numCoursesPerSem.spring == 0
                        }
                        max={5}
                        min={0}
                        defaultValue={values.teachingDaysPerWeek.spring}
                        onChange={(v) =>
                            //setFieldValue("teachingDaysPerWeek.spring", v);
                            console.log(values.numCoursesPerSem.spring != 0)
                        }
                    />
                    <Text alignSelf="center" pl={10}>
                        Summer
                    </Text>
                    <NumInput
                        name="teachingDaysPerWeek.summer"
                        isDisabled={
                            isDisabled || values.numCoursesPerSem.summer == 0
                        }
                        max={5}
                        min={0}
                        defaultValue={values.teachingDaysPerWeek.summer}
                        onChange={(v) =>
                            setFieldValue("teachingDaysPerWeek.summer", v)
                        }
                    />
                </HStack>
            </FormControl>
            <FormControl>
                <FormLabel>Preferred Teaching Days</FormLabel>
                <HStack align="left">
                    <Flex direction="column">
                        <Text>Fall</Text>
                        <Field
                            as={Checkbox}
                            name="preferredDaysFall.monday"
                            isDisabled={
                                isDisabled || values.numCoursesPerSem.fall == 0
                            }
                            defaultChecked={values.preferredDaysFall.monday}
                        >
                            Monday
                        </Field>
                        <Field
                            as={Checkbox}
                            name="preferredDaysFall.tuesday"
                            isDisabled={
                                isDisabled || values.numCoursesPerSem.fall == 0
                            }
                            defaultChecked={values.preferredDaysFall.tuesday}
                        >
                            Tuesday
                        </Field>
                        <Field
                            as={Checkbox}
                            name="preferredDaysFall.wednesday"
                            isDisabled={
                                isDisabled || values.numCoursesPerSem.fall == 0
                            }
                            defaultChecked={values.preferredDaysFall.wednesday}
                        >
                            Wednesday
                        </Field>
                        <Field
                            as={Checkbox}
                            name="preferredDaysFall.thursday"
                            isDisabled={
                                isDisabled || values.numCoursesPerSem.fall == 0
                            }
                            defaultChecked={values.preferredDaysFall.thursday}
                        >
                            Thursday
                        </Field>
                        <Field
                            as={Checkbox}
                            name="preferredDaysFall.friday"
                            isDisabled={
                                isDisabled || values.numCoursesPerSem.fall == 0
                            }
                            defaultChecked={values.preferredDaysFall.friday}
                        >
                            Friday
                        </Field>
                    </Flex>
                    <Flex direction="column" pl={20}>
                        <Text alignSelf="start">Spring</Text>
                        <Field
                            as={Checkbox}
                            name="preferredDaysSpring.monday"
                            isDisabled={
                                isDisabled ||
                                values.numCoursesPerSem.spring == 0
                            }
                            defaultChecked={values.preferredDaysSpring.monday}
                        >
                            Monday
                        </Field>
                        <Field
                            as={Checkbox}
                            name="preferredDaysSpring.tuesday"
                            isDisabled={
                                isDisabled ||
                                values.numCoursesPerSem.spring == 0
                            }
                            defaultChecked={values.preferredDaysSpring.tuesday}
                        >
                            Tuesday
                        </Field>
                        <Field
                            as={Checkbox}
                            name="preferredDaysSpring.wednesday"
                            isDisabled={
                                isDisabled ||
                                values.numCoursesPerSem.spring == 0
                            }
                            defaultChecked={
                                values.preferredDaysSpring.wednesday
                            }
                        >
                            Wednesday
                        </Field>
                        <Field
                            as={Checkbox}
                            name="preferredDaysSpring.thursday"
                            isDisabled={
                                isDisabled ||
                                values.numCoursesPerSem.spring == 0
                            }
                            defaultChecked={values.preferredDaysSpring.thursday}
                        >
                            Thursday
                        </Field>
                        <Field
                            as={Checkbox}
                            name="preferredDaysSpring.friday"
                            isDisabled={
                                isDisabled ||
                                values.numCoursesPerSem.spring == 0
                            }
                            defaultChecked={values.preferredDaysSpring.friday}
                        >
                            Friday
                        </Field>
                    </Flex>
                    <Flex direction="column" pl={20}>
                        <Text>Summer</Text>
                        <Field
                            as={Checkbox}
                            name="preferredDaysSummer.monday"
                            isDisabled={
                                isDisabled ||
                                values.numCoursesPerSem.summer == 0
                            }
                            defaultChecked={values.preferredDaysSummer.monday}
                        >
                            Monday
                        </Field>
                        <Field
                            as={Checkbox}
                            name="preferredDaysSummer.tuesday"
                            isDisabled={
                                isDisabled ||
                                values.numCoursesPerSem.summer == 0
                            }
                            defaultChecked={values.preferredDaysSummer.tuesday}
                        >
                            Tuesday
                        </Field>
                        <Field
                            as={Checkbox}
                            name="preferredDaysSummer.wednesday"
                            isDisabled={
                                isDisabled ||
                                values.numCoursesPerSem.summer == 0
                            }
                            defaultChecked={
                                values.preferredDaysSummer.wednesday
                            }
                        >
                            Wednesday
                        </Field>
                        <Field
                            as={Checkbox}
                            name="preferredDaysSummer.thursday"
                            isDisabled={
                                isDisabled ||
                                values.numCoursesPerSem.summer == 0
                            }
                            defaultChecked={values.preferredDaysSummer.thursday}
                        >
                            Thursday
                        </Field>
                        <Field
                            as={Checkbox}
                            name="preferredDaysSummer.friday"
                            isDisabled={
                                isDisabled ||
                                values.numCoursesPerSem.summer == 0
                            }
                            defaultChecked={values.preferredDaysSummer.friday}
                        >
                            Friday
                        </Field>
                    </Flex>
                </HStack>
            </FormControl>
        </VStack>
    );
};

export default Availability;
