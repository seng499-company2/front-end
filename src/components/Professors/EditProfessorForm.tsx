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
    const { professor, refetch, disabled } = props;
    const toast = useToast();
    const { isError, isLoading, execute } = usePostQuery(
        `/api/users/${professor.username}/`
    );

    const onSubmit = (values) => {
        execute({
            data: values,
        })
            .then((response) => {
                refetch();
                toast({
                    title: "Professor Edited Successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left",
                });
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
                    username: professor.username,
                    first_name: professor.firstName,
                    last_name: professor.lastName,
                    email: professor.email,
                    is_superuser: false,
                },
                prof_type: "TP",
                is_peng: false,
            }}
            onSubmit={(values) => {
                console.log("On Submit Called");
                onSubmit(values);
            }}
        >
            {({ errors, touched }) => (
                <Form id="edit-professor-form">
                    <VStack spacing={4} align="flex-start">
                        <FormControl isRequired>
                            <FormLabel>First Name</FormLabel>
                            <Field
                                as={Input}
                                name="user.first_name"
                                variant="filled"
                                disabled={disabled}
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
                                disabled={disabled}
                            />
                            <FormErrorMessage>
                                {errors.user?.last_name}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Field
                                as={Input}
                                name="user.email"
                                variant="filled"
                                type="email"
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
