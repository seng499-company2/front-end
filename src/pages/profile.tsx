import { ReactElement } from "react";

import { Avatar, Center, Text, VStack } from "@chakra-ui/react";
import AdminLayout from "@components/Layout/AdminLayout";
import useAuth from "@hooks/useAuth";

export const Profile = () => {
    const {
        user: { firstName, lastName, username, email },
    } = useAuth();

    const displayName = `${firstName} ${lastName}`;
    return (
        <Center height="50vh">
            <VStack>
                <Avatar size="xl" />
                <Text>{displayName}</Text>
                <Text>{username}</Text>
                <Text>{email}</Text>
            </VStack>
        </Center>
    );
};

Profile.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Profile;
