import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    VStack,
    Checkbox,
    Button,
    Heading,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import Availability from "./Availability";

const PreferencesForm = (props) => {
    const { handleSubmit } = props;

    return (
        <Formik
            initialValues={{
                nonTeachingSem: {
                    fall: false,
                    spring: false,
                    summer: false
                },
                relief: {
                    value: false,
                    numCourses: 0,
                },
                sabbatical: {
                    value: false,
                    duration: 0,
                    fromMonth: 'january'
                }


            }}
            onSubmit={(values) => {
                //handleSubmit(values);
                alert(JSON.stringify(values, null, 2));
            }}
        >
            {({ errors, touched }) => (
                <Form id="preferences-form">
                    <Heading as='h3' size='md' mb={5}>General Preferences</Heading>
                    <Availability />
                    <Button type="submit">Submit</Button>
                </Form>
            )}
        </Formik>
    );
};

export default PreferencesForm;
