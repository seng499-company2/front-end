import { Box, Text } from "@chakra-ui/react";
import { ReactElement } from "react";

import AdminLayout from "../components/Layout/AdminLayout";

const Index = () => (
    <Box pt="1rem">
        <Text>Home</Text>
    </Box>
);

Index.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Index;
