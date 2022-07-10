import { Text } from "@chakra-ui/react";

const CoursePrefNameCell = ({ name }) => {
    return (
        <Text fontSize="sm" fontWeight="bold">
            {name}
        </Text>
    );
};

export default CoursePrefNameCell;
