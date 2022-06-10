import {
    Box,
    Checkbox,
    HStack,
    Select,
    Stack,
    Text,
    FormControl,
    FormLabel,
    Flex,
    VStack
} from "@chakra-ui/react";
import { useState } from "react";
import { Field, Form } from "formik";

const Availability = () => {
    const [isReliefDisabled, setIsReliefDisabled] = useState(true);
    const [isSabbaticalDisabled, setIsSabbaticalDisabled] = useState(true);

    return (
        <VStack spacing={10} align='left'>
            <FormControl >
                <FormLabel>Select Non-teaching semesters</FormLabel>
                <VStack align='left'>
                    <Field as={Checkbox} name="nonTeachingSem.fall">
                        Fall
                    </Field>
                    <Field as={Checkbox} name="nonTeachingSem.spring">
                        Spring
                    </Field>
                    <Field as={Checkbox} name="nonTeachingSem.summer">
                        Summer
                    </Field>
                </VStack>
            </FormControl>
            <FormControl>
                <FormLabel>Select Relief Preferences</FormLabel>
                <Field as={Checkbox} name="relief.value">
                    Taking relief
                </Field>
            </FormControl>
            <FormControl>
                <FormLabel>How many courses are you teaching?</FormLabel>
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
            </FormControl>
            <FormControl>
                <FormLabel>Select Sabbatical Preferences</FormLabel>
                <Field as={Checkbox} name="sabbatical.value">
                    Taking sabbatical
                </Field>
            </FormControl>
            <FormControl>
                <FormLabel>Sabbatical Length</FormLabel>
                <Field
                    as={Select}
                    name="sabbatical.duration"
                    colorScheme="primary"
                    variant="filled"
                >
                    <option value="half">half leave</option>
                    <option value="full">full leave</option>
                </Field>
            </FormControl>
            <FormControl>
                <FormLabel>Sabbatical Start Month</FormLabel>
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
            </FormControl>
        </VStack>
    );
};

export default Availability;
