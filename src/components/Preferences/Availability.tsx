import {
    Box,
    Checkbox,
    HStack,
    Select,
    Stack,
    Text,
} from "@chakra-ui/react";
import { useState } from "react";

const Availability = () => {
    const [isReliefDisabled, setIsReliefDisabled] = useState(true);
    const [isSabbaticalDisabled, setIsSabbaticalDisabled] = useState(true);

    return (
        <Box>
            <Stack spacing={5} direction="column">
                <HStack spacing={5}>
                    <Text>Please check desired non-teaching semester(s):</Text>
                    <Checkbox> Fall </Checkbox>
                    <Checkbox> Spring </Checkbox>
                    <Checkbox> Summer </Checkbox>
                </HStack>
                <Stack spacing={1} direction="column">
                    <Checkbox
                        onChange={() => setIsReliefDisabled(!isReliefDisabled)}
                    >
                        I am taking relief
                    </Checkbox>
                    <HStack>
                        <Text minW="450px">
                            If yes, enter how many courses you will be teaching
                            this year:
                        </Text>
                        <Select
                            isDisabled={isReliefDisabled}
                        >
                            <option value="option5">5 Courses</option>
                            <option value="option4">4 Courses</option>
                            <option value="option3">3 Courses</option>
                            <option value="option2">2 Courses</option>
                            <option value="option1">1 Course</option>
                        </Select>
                    </HStack>
                </Stack>
                <Stack spacing={1} direction="column">
                    <Checkbox
                        onChange={(e) =>
                            setIsSabbaticalDisabled(!isSabbaticalDisabled)
                        }
                    >
                        I am on sabbatical
                    </Checkbox>
                    <HStack spacing={5}>
                        <Text minW="180px"> If yes, enter the duration:</Text>
                        <Select
                            isDisabled={isSabbaticalDisabled}
                        >
                            <option value="option1">half leave</option>
                            <option value="option2">full leave</option>
                        </Select>
                        <Text>from</Text>
                        <Select
                            isDisabled={isSabbaticalDisabled}
                        >
                            <option value="option1">January</option>
                            <option value="option2">May</option>
                            <option value="option3">September</option>
                        </Select>
                    </HStack>
                </Stack>
            </Stack>
        </Box>
    );
};

export default Availability;
