import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Text,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { ReactElement, useState } from "react";

import AdminLayout from "../components/Layout/AdminLayout";
import SampleSidesheet from "../components/Sample/SampleSidesheet";

const Schedules = ({ scheduledCourses }) => {
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
              <Th>Course</Th>
              <Th>Section</Th>
              <Th>Instructor</Th>
              <Th>Time</Th>
              <Th>Capacity</Th>
            </Tr>
          </Thead>
          <Tbody>
            {scheduledCourses.map((course) => (
              <Tr
                cursor={"pointer"}
                key={course.id}
                onClick={() => setOpen(!open)}
              >
                <Td>
                  <VStack align={"flex-start"}>
                    <Text>{course.code}</Text>
                    <Text>{course.name}</Text>
                  </VStack>
                </Td>
                <Td>{course.section}</Td>
                <Td>{course.instructor}</Td>
                <Td>{course.time}</Td>
                <Td>{course.capacity}</Td>
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
  const scheduledCourses = [
    {
      id: 1,
      code: "CSC 225",
      name: "Data Structures & Algorithms I",
      section: "A01",
      instructor: "Dr. John Doe",
      time: "MWF 9:00-10:50",
      capacity: 150,
    },
    {
      id: 2,
      code: "CSC 226",
      name: "Data Structures & Algorithms II",
      section: "A01",
      instructor: "Dr. John Doe",
      time: "MWF 10:00-11:50",
      capacity: 150,
    },
    {
      id: 3,
      code: "CSC 227",
      name: "Data Structures & Algorithms III",
      section: "A01",
      instructor: "Dr. John Doe",
      time: "MWF 11:00-12:50",
      capacity: 150,
    },
  ];

  // get from api
  //const scheduledCourses = fetch(`${API_URL}/v1/schedules`);

  return {
    props: {
      scheduledCourses,
    },
  };
};

Schedules.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Schedules;
