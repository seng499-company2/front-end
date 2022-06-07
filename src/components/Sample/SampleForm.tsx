import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    VStack,
    Checkbox,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";

const SampleForm = (props) => {
    const { handleSubmit } = props;

    return (
        <Formik
            initialValues={{
                name: "",
                email: "",
                rememberMe: false,
            }}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
        >
            {({ errors, touched }) => (
                <Form id="sample-form">
                    <VStack spacing={4} align="flex-start">
                        <FormControl>
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <Field
                                as={Input}
                                id="name"
                                name="name"
                                type="name"
                                colorScheme="primary"
                                variant="filled"
                            />
                        </FormControl>
                        <FormControl isInvalid={errors.email && touched.email}>
                            <FormLabel htmlFor="email">Email Address</FormLabel>
                            <Field
                                as={Input}
                                id="email"
                                name="email"
                                type="email"
                                variant="filled"
                                validate={(value) => {
                                    let error;
                                    if (value?.length < 1) {
                                        error = "Email is required";
                                    }
                                    return error;
                                }}
                            />
                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                        </FormControl>
                        <Field as={Checkbox} id="rememberMe" name="rememberMe">
                            Remember me?
                        </Field>
                    </VStack>
                </Form>
            )}
        </Formik>
    );
};

export default SampleForm;
