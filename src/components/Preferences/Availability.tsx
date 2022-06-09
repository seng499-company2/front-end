import { Box, Checkbox, Flex, Select, Stack } from "@chakra-ui/react";
import { useState } from "react";

const Availability = () => {

    const [isReliefDisabled, setIsReliefDisabled] = useState(true);
    const [isSabbaticalDisabled, setIsSabbaticalDisabled] = useState(true);

    var enableRelief: boolean = true, enableSabbatical: boolean = true;
    
    return (
        <Box w='80%'>
            <Stack spacing={5} direction='column'>
                <Stack spacing={5} direction='row'>
                    <p>Please check desired semester(s) off:</p>
                    <Checkbox> Fall </Checkbox>
                    <Checkbox> Spring </Checkbox>
                    <Checkbox> Summer </Checkbox>
                </Stack>
                <Stack spacing={2} direction='column'>
                    <Checkbox onChange={() => setIsReliefDisabled(!isReliefDisabled)}> I am taking relief </Checkbox>
                    <Stack spacing={5} direction='row'>
                        <p>If yes, enter how many courses you will be teaching this year:</p>
                        <Select placeholder='5 Courses' isDisabled={isReliefDisabled}>
                            <option value='option2'>4 Courses</option>
                            <option value='option3'>3 Courses</option>
                            <option value='option4'>2 Courses</option>
                            <option value='option5'>1 Course</option>
                        </Select>
                    </Stack>
                </Stack>
                <Stack spacing={2} direction='column'>
                    <Checkbox onChange={(e) => setIsSabbaticalDisabled(!isSabbaticalDisabled)}> I am on sabbatical </Checkbox>
                    <Stack spacing={5} direction='row'>
                    <p>If yes, enter the duration:</p>
                        <Select placeholder='half leave' isDisabled={isSabbaticalDisabled}>
                            <option value='option2'>full leave</option>
                        </Select>
                        <p>from</p>
                        <Select placeholder='January' isDisabled={isSabbaticalDisabled}>
                            <option value='option2'>May</option>
                            <option value='option3'>September</option>
                        </Select>
                    </Stack>
                </Stack>
            </Stack>   
        </Box> 
    )
}

export default Availability;


