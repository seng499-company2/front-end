import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    VStack,
    Select,
    Box,
    HStack,
    Switch,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";

const EditProfessorForm = ({ handleSubmit, professor, disabled }) => {
    return (
        <Formik
            initialValues={{
                user: {
                    username: professor.username,
                    first_name: professor.firstName,
                    last_name: professor.lastName,
                    email: professor.email,
                    is_superuser: professor.isAdmin,
                },
                prof_type: professor.type,
                is_peng: professor.isPeng,
                is_form_submitted: professor.complete,
            }}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
        >
            {({ values, errors }) => (
                <Form id="edit-professor-form">
                    <VStack spacing={4} align="flex-start">
                        <HStack w="100%">
                            <Box minW="80%">
                                <FormControl isRequired>
                                    <FormLabel>First Name</FormLabel>
                                    <Field
                                        as={Input}
                                        name="user.first_name"
                                        variant="filled"
                                        mb={2}
                                        disabled={disabled}
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
                                <FormControl isRequired>
                                    <FormLabel>Last Name</FormLabel>
                                    <Field
                                        as={Input}
                                        name="user.last_name"
                                        variant="filled"
                                        mb={2}
                                        disabled={disabled}
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
                                <FormControl isRequired>
                                    <FormLabel>Email</FormLabel>
                                    <Field
                                        as={Input}
                                        name="user.email"
                                        variant="filled"
                                        type="email"
                                        disabled={disabled}
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
                                        isChecked={values.user.is_superuser}
                                        disabled={disabled}
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
                                        disabled={disabled}
                                        isChecked={values.is_peng}
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
                                disabled={disabled}
                            >
                                <option value="TP">Teaching Professor</option>
                                <option value="RP">Research Professor</option>
                            </Field>
                        </FormControl>
                    </VStack>
                </Form>
            )}
        </Formik>
    );
};

export default EditProfessorForm;
