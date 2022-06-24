import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    VStack,
    Textarea,
    Select
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";

const AddCourseForm = (props) => {
    const { handleSubmit } = props;

    return (
        <Formik
            initialValues={{
                name: "",
                department: "csc",
                code: "",
                description:"",
            }}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
        >
            {({ errors, touched }) => (
                <Form id="add-course-form">
                    <VStack spacing={4} align="flex-start">
                        <FormControl isInvalid={errors.name && touched.name}>
                            <FormLabel>Name</FormLabel>
                            <Field
                                as={Input}
                                name="name"
                                variant="filled"
                                validate={(value) => {
                                    let error;
                                    if (value.length <1) {
                                        error = "Required";
                                    }
                                    return error;
                                }}
                            />
                            <FormErrorMessage>{errors.name}</FormErrorMessage>
                        </FormControl>
                        <FormControl >
                            <FormLabel>Department</FormLabel>
                            <Field
                            as={Select}
                            name="department"
                            variant="filled"
                        >
                            <option value="csc">CSC</option>
                            <option value="ece">ECE</option>
                            <option value="seng">SENG</option>
                        </Field>
                        </FormControl>
                        <FormControl isInvalid={errors.code && touched.code}>
                            <FormLabel>Course Code</FormLabel>
                            <Field
                                as={Input}
                                name="code"
                                variant="filled"
                                validate={(value) => {
                                    let error;
                                    if (value?.length !== 3 && value?.length !== 4) {
                                        error = "Must be 3 or 4 characters";
                                    }
                                    return error;
                                }}
                            />
                            <FormErrorMessage>{errors.code}</FormErrorMessage>
                        </FormControl><FormControl>
                            <FormLabel>Course Description</FormLabel>
                            <Field
                                as={Textarea}
                                name="description"
                                variant="filled"
                            />
                        </FormControl>

                    </VStack>
                </Form>
            )}
        </Formik>
    );
};

export default AddCourseForm;
