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
    const { setFieldValue, values } = props;

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
                        max={5}
                        min={0}
                        onChange={(v) =>
                            setFieldValue("numCoursesPerSem.fall", v)
                        }
                    />
                    <Text alignSelf="center" pl={10}>
                        Spring
                    </Text>
                    <NumInput
                        name="numCoursesPerSem.spring"
                        max={5}
                        min={0}
                        onChange={(v) =>
                            setFieldValue("numCoursesPerSem.spring", v)
                        }
                    />
                    <Text alignSelf="center" pl={10}>
                        Summer
                    </Text>
                    <NumInput
                        name="numCoursesPerSem.summer"
                        max={5}
                        min={0}
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
                <Field as={Checkbox} name="sabbatical.value">
                    Taking Sabbatical
                </Field>

                {values.sabbatical.value && (
                    <>
                        <Text mt={5}>Sabbatical Length</Text>
                        <Field
                            as={Select}
                            name="sabbatical.duration"
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
                <NumInput
                    name="teachingDaysPerWeek.value"
                    max={5}
                    min={0}
                    onChange={(v) =>
                        setFieldValue("teachingDaysPerWeek.value", v)
                    }
                />
            </FormControl>
            <FormControl>
                <FormLabel>Preferred Teaching Days</FormLabel>
                <Flex direction="column">
                    <Field as={Checkbox} name="preferredDays.monday">
                        Monday
                    </Field>
                    <Field as={Checkbox} name="preferredDays.tuesday">
                        Tuesday
                    </Field>
                    <Field as={Checkbox} name="preferredDays.wednesday">
                        Wednesday
                    </Field>
                    <Field as={Checkbox} name="preferredDays.thursday">
                        Thursday
                    </Field>
                    <Field as={Checkbox} name="preferredDays.friday">
                        Friday
                    </Field>
                </Flex>
            </FormControl>
        </VStack>
    );
};

export default Availability;
