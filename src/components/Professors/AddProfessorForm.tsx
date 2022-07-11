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

const AddProfessorForm = (props) => {
    const { handleSubmit, refetch } = props;
    const toast = useToast();
    const { isError, isLoading, execute } = usePostQuery("/api/users/");

    const onSubmit = (values) => {
        execute({
            data: values,
        })
            .then((response) => {
                refetch();
                toast({
                    title: "Professor Added Successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left",
                });
                handleSubmit(false);
            })
            .catch((error) => {
                toast({
                    title: "Error: " + error.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                    position: "bottom-left",
                });
            });
    };

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
                            <FormLabel>Password</FormLabel>
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
