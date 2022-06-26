import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    useColorModeValue,
} from "@chakra-ui/react";
import { FormEvent } from "react";
import useAuth from "../hooks/useAuth";

export const LoginCard = () => {
    const { login, loading, error } = useAuth();

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const username = event.currentTarget.username.value;
        const password = event.currentTarget.password.value;

        login(username, password);
    }

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
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <FormControl>
                            <FormLabel htmlFor="username">
                                Email address
                            </FormLabel>
                            <Input
                                id="username"
                                // type="email"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Input id="password" type="password" />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: "column", sm: "row" }}
                                align={"start"}
                                justify={"space-between"}
                            >
                                <Checkbox>Remember me</Checkbox>
                                <Link color={"primary.400"}>
                                    Forgot password?
                                </Link>
                            </Stack>
                            <Button disabled={loading} type="submit">
                                Sign in
                            </Button>
                            {error && <p>Bad login/password</p>}
                        </Stack>
                    </Stack>
                </form>
            </Box>
        </Stack>
    );
};

export default LoginCard;
