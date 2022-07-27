import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    VStack,
    Select,
    Switch,
    HStack,
    Box,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";

const AddProfessorForm = ({ handleSubmit }) => {
    return (
        <Formik
            initialValues={{
                user: {
                    username: "",
                    password: "",
                    first_name: "",
                    last_name: "",
                    email: "",
                    is_superuser: false,
                },
                prof_type: "TP",
                is_peng: false,
                is_form_submitted: false,
            }}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
        >
            {({ errors, touched }) => (
                <Form id="add-professor-form">
                    <VStack spacing={4} align="flex-start">
                        <HStack w="100%">
                            <Box minW="80%">
                                <FormControl
                                    isInvalid={
                                        errors?.user?.first_name &&
                                        touched?.user?.first_name
                                    }
                                >
                                    <FormLabel>First Name</FormLabel>
                                    <Field
                                        as={Input}
                                        name="user.first_name"
                                        variant="filled"
                                        mb={2}
                                        validate={(value) => {
                                            let error;
                                            if (value.length < 1) {
                                                error = "Required";
                                            }
                                            return error;
                                        }}
                                    />
                                    <FormErrorMessage>
                                        {errors?.user?.first_name}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isInvalid={
                                        errors?.user?.last_name &&
                                        touched?.user?.last_name
                                    }
                                >
                                    <FormLabel>Last Name</FormLabel>
                                    <Field
                                        as={Input}
                                        name="user.last_name"
                                        variant="filled"
                                        mb={2}
                                        validate={(value) => {
                                            let error;
                                            if (value.length < 1) {
                                                error = "Required";
                                            }
                                            return error;
                                        }}
                                    />
                                    <FormErrorMessage>
                                        {errors.user?.last_name}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isInvalid={
                                        errors.user?.email &&
                                        touched.user?.email
                                    }
                                >
                                    <FormLabel>Email</FormLabel>
                                    <Field
                                        as={Input}
                                        name="user.email"
                                        variant="filled"
                                        type="email"
                                        validate={(value) => {
                                            let error;
                                            if (value.length < 1) {
                                                error = "Required";
                                            }
                                            return error;
                                        }}
                                    />
                                    <FormErrorMessage>
                                        {errors.user?.email}
                                    </FormErrorMessage>
                                </FormControl>
                            </Box>
                            <VStack
                                minW="20%"
                                alignItems={"center"}
                                justifyContent="space-between"
                                gap={8}
                            >
                                <FormControl w="fit-content">
                                    <FormLabel>Administrator</FormLabel>
                                    <Field
                                        as={Switch}
                                        name="user.is_superuser"
                                        variant="filled"
                                        ml={8}
                                    />
                                </FormControl>
                                <FormControl w="fit-content">
                                    <FormLabel>P.Eng.</FormLabel>
                                    <Field
                                        as={Switch}
                                        name="is_peng"
                                        variant="filled"
                                        ml={1}
                                    />
                                </FormControl>
                            </VStack>
                        </HStack>

                        <FormControl>
                            <FormLabel>Professor Type</FormLabel>
                            <Field
                                as={Select}
                                name="prof_type"
                                variant="filled"
                            >
                                <option value="TP">Teaching Professor</option>
                                <option value="RP">Research Professor</option>
                            </Field>
                        </FormControl>
                        <FormControl
                            isInvalid={
                                errors?.user?.username &&
                                touched?.user?.username
                            }
                        >
                            <FormLabel>Username</FormLabel>
                            <Field
                                as={Input}
                                name="user.username"
                                variant="filled"
                                validate={(value) => {
                                    let error;
                                    if (value.length < 1) {
                                        error = "Required";
                                    }
                                    return error;
                                }}
                            />
                            <FormErrorMessage>
                                {errors?.user?.username}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isInvalid={
                                errors?.user?.password &&
                                touched?.user?.password
                            }
                        >
                            <FormLabel>Password (For demo purposes)</FormLabel>
                            <Field
                                as={Input}
                                name="user.password"
                                variant="filled"
                                type="password"
                                validate={(value) => {
                                    let error;
                                    if (value.length < 1) {
                                        error = "Required";
                                    }
                                    return error;
                                }}
                            />
                            <FormErrorMessage>
                                {errors?.user?.username}
                            </FormErrorMessage>
                        </FormControl>
                    </VStack>
                </Form>
            )}
        </Formik>
    );
};

export default AddProfessorForm;
