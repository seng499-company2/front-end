import { Box, Text } from "@chakra-ui/react";
import { ReactElement } from "react";

import AdminLayout from "../components/Layout/AdminLayout";

const Constraints = () => (
  <Box pt="1rem">
    <Text>Constraints</Text>
  </Box>
);

Constraints.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Constraints;
