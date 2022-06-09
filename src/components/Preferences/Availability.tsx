import { Box, Checkbox, Flex, Select, Stack } from "@chakra-ui/react";

const Availability = () => {

    function setEnable(toEnable: boolean): void {
        toEnable = !toEnable; //not doing shit
    }

    var enableRelief: boolean = true, enableSabbatical: boolean = true;
    
    return (
        <Box>
            <Stack spacing={5} direction='column'>
                <Stack spacing={5} direction='row'>
                    <p>Please check desired semester(s) off:</p>
                    <Checkbox> Fall </Checkbox>
                    <Checkbox> Spring </Checkbox>
                    <Checkbox> Summer </Checkbox>
                </Stack>
                <Stack spacing={2} direction='column'>
                    <Checkbox onChange={(e) => setEnable(enableRelief)}> I am taking relief </Checkbox>
                    <Stack spacing={5} direction='row'>
                        <p>If yes, enter how many courses you will be teaching this year:</p>
                        <Select placeholder='5 Courses' isDisabled={enableRelief}>
                            <option value='option2'>4 Courses</option>
                            <option value='option3'>3 Courses</option>
                            <option value='option4'>2 Courses</option>
                            <option value='option5'>1 Course</option>
                        </Select>
                    </Stack>
                </Stack>
                <Stack spacing={2} direction='column'>
                    <Checkbox onChange={(e) => setEnable(enableSabbatical)}> I am on sabbatical </Checkbox>
                    <Stack spacing={5} direction='row'>
                    <p>If yes, enter the duration:</p>
                        <Select placeholder='half leave' isDisabled={enableSabbatical}>
                            <option value='option2'>full leave</option>
                        </Select>
                        <p>from</p>
                        <Select placeholder='January' isDisabled={enableSabbatical}>
                            <option value='option2'></option>
                        </Select>
                    </Stack>
                </Stack>
            </Stack>   
        </Box> 
    )
}

export default Availability;


