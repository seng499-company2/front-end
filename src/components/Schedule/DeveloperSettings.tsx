import {
    Checkbox,
    VStack,
    Text,
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    HStack,
} from "@chakra-ui/react";
import useSchedule from "@hooks/useSchedule";

const DeveloperSettings = ({}) => {
    const {
        setUseMockData,
        setCompany,
        useMockData,
        company,
        generateSchedule,
    } = useSchedule();

    return (
        <Accordion allowToggle maxW={500} minW={"fit-content"}>
            <AccordionItem>
                <h2>
                    <AccordionButton
                        _expanded={{ bg: "tomato", color: "white" }}
                    >
                        <Box flex="1" textAlign="left">
                            Developer Settings
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel>
                    <HStack justifyContent={"space-between"}>
                        <VStack alignItems={"left"} border="1px grey">
                            <Checkbox
                                onChange={(e) => {
                                    setUseMockData(!useMockData);
                                }}
                                isChecked={useMockData}
                            >
                                <Text as="u">Use Mock Data</Text>
                            </Checkbox>
                            <Checkbox
                                onChange={(e) => {
                                    setCompany(e.target.checked ? "1" : "2");
                                }}
                                isChecked={company === "1"}
                            >
                                <Text as="u">Use Company 1 Algorithm</Text>
                            </Checkbox>
                        </VStack>
                        <Button
                            onClick={() => generateSchedule()}
                            colorScheme="red"
                        >
                            <Text as="u">Execute</Text>
                        </Button>
                    </HStack>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};

export default DeveloperSettings;
