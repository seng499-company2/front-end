import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";

import useAuth from "src/hooks/useAuth";

export const LoginCard = () => {
    const { login, isLoading } = useAuth();

    return (
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
                <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            </Stack>
            <Box
                rounded={"lg"}
                bg={useColorModeValue("white", "gray.700")}
                boxShadow={"lg"}
                p={8}
            >
                <Formik
                    initialValues={{
                        username: "",
                        password: "",
                    }}
                    onSubmit={async ({ username, password }) => {
                        await login(username, password);
                    }}
                >
                    {({ errors, touched }) => (
                        <Form id="login-form">
                            <VStack spacing={4} align="flex-start">
                                <FormControl>
                                    <FormLabel>Email address</FormLabel>
                                    <Field
                                        as={Input}
                                        name="username"
                                        type="username"
                                    ></Field>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Password</FormLabel>
                                    <Field
                                        as={Input}
                                        name="password"
                                        type="password"
                                    ></Field>
                                </FormControl>
                                <Button type="submit" isLoading={isLoading}>
                                    Sign in
                                </Button>
                            </VStack>
                        </Form>
                    )}
                </Formik>
                <Stack spacing={4}></Stack>
            </Box>
        </Stack>
    );
};

export default LoginCard;
