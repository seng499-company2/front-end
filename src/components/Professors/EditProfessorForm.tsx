import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    VStack,
    Select,
    Button,
    Text,
    useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { usePostQuery } from "@hooks/useRequest";

const EditProfessorForm = (props) => {
    const { professor, disabled } = props;
    // const toast = useToast();
    // const { isError, isLoading, execute } = usePostQuery("/api/users/");

    const onSubmit = (values) => {
        // execute({
        //     data: values,
        // })
        //     .then((response) => {
        //         refetch();
        //         toast({
        //             title: "Professor Edited Successfully",
        //             status: "success",
        //             duration: 5000,
        //             isClosable: true,
        //             position: "bottom-left",
        //         });
        //         handleSubmit(false);
        //     })
        //     .catch((error) => {
        //         toast({
        //             title: "Error: " + error.message,
        //             status: "error",
        //             duration: 9000,
        //             isClosable: true,
        //             position: "bottom-left",
        //         });
        //     });
    };

    return (
        <Formik
            initialValues={{
                user: {
                    first_name: professor.firstName,
                    last_name: professor.lastName,
                    email: professor.email,
                    is_superuser: false,
                },
                prof_type: "TP",
                is_peng: false,
            }}
            onSubmit={(values) => {
                onSubmit(values);
            }}
        >
            {({ errors, touched }) => (
                <Form id="add-professor-form">
                    <VStack spacing={4} align="flex-start">
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
                                validate={(value) => {
                                    let error;
                                    if (value.length < 1) {
                                        error = "Required";
                                    }
                                    return error;
                                }}
                                disabled={disabled}
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
                                validate={(value) => {
                                    let error;
                                    if (value.length < 1) {
                                        error = "Required";
                                    }
                                    return error;
                                }}
                                disabled={disabled}
                            />
                            <FormErrorMessage>
                                {errors.user?.last_name}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isInvalid={
                                errors.user?.email && touched.user?.email
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
                                disabled={disabled}
                            />
                            <FormErrorMessage>
                                {errors.user?.email}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Super User</FormLabel>
                            <Field
                                as={Select}
                                name="user.is_superuser"
                                variant="filled"
                                type="email"
                                disabled={disabled}
                            >
                                <option value={0}>False</option>
                                <option value={1}>True</option>
                            </Field>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Is PEng</FormLabel>
                            <Field
                                as={Select}
                                name="is_peng"
                                variant="filled"
                                type="email"
                                disabled={disabled}
                            >
                                <option value={0}>False</option>
                                <option value={1}>True</option>
                            </Field>
                        </FormControl>
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
