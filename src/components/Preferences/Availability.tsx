import { Box, Checkbox, HStack, Select, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import NumInput from "./NumInput";

const Availability = () => {
    const [isReliefDisabled, setIsReliefDisabled] = useState(true);
    const [isSabbaticalDisabled, setIsSabbaticalDisabled] = useState(true);

    return (
        <Box>
            <Stack spacing={10} direction="column">
                <HStack spacing={3}>
                    <Text>
                        Please select a number of desired courses per semester:
                    </Text>
                    <Text>Fall</Text>
                    <NumInput id="fall" />
                    <Text>Spring</Text>
                    <NumInput id="Spring" />
                    <Text>Summer</Text>
                    <NumInput id="Summer" />
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
                        <NumInput isDisabled={isReliefDisabled}/>
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
                        <Select isDisabled={isSabbaticalDisabled}>
                            <option value="option1">half leave</option>
                            <option value="option2">full leave</option>
                        </Select>
                        <Text>from</Text>
                        <Select isDisabled={isSabbaticalDisabled}>
                            <option value="option1">January</option>
                            <option value="option2">May</option>
                            <option value="option3">September</option>
                        </Select>
                    </HStack>
                </Stack>
                <HStack spacing={5}>
                    <Text>How many days a week would you like to teach?</Text>
                    <NumInput id="days" />
                    <Checkbox>Mon</Checkbox>
                    <Checkbox>Tues</Checkbox>
                    <Checkbox>Wed</Checkbox>
                    <Checkbox>Thurs</Checkbox>
                    <Checkbox>Fri</Checkbox>
                </HStack>
            </Stack>
        </Box>
    );
};

export default Availability;
