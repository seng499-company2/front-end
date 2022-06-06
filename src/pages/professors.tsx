import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ReactElement, useState } from "react";

import { CompleteStatusBadge } from "../components/CompleteStatusBadge";
import AdminLayout from "../components/Layout/AdminLayout";
import SampleSidesheet from "../components/Sample/SampleSidesheet";

const Professors = ({ professors }) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
    setOpen(false);
  };

  return (
    <Box pt="1rem">
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Preferences</Th>
            </Tr>
          </Thead>
          <Tbody>
            {professors.map((course) => (
              <Tr
                cursor={"pointer"}
                key={course.id}
                onClick={() => setOpen(!open)}
              >
                <Td>{course.name}</Td>
                <Td>
                  <CompleteStatusBadge complete={course.complete} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <SampleSidesheet
        isOpen={open}
        onClose={() => setOpen(false)}
        handleSubmit={handleSubmit}
      />
    </Box>
  );
};

export const getServerSideProps = async () => {
  const professors = [
    { id: 1, name: "Dave Dave", complete: true },
    { id: 2, name: "Owen Wilson", complete: false },
    { id: 3, name: "Gordo Ramso", complete: true },
  ];

  // get from api
  // const professors = fetch(`${API_URL}/v1/professors`);

  return {
    props: {
      professors,
    },
  };
};

Professors.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Professors;
