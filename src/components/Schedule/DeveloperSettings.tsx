import {
    Checkbox,
    Select,
    VStack,
    Text,
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
} from "@chakra-ui/react";

const DeveloperSettings = ({ setUseMockData, setCompany, useMockData }) => {
    return (
        <Accordion allowToggle>
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
                    <VStack alignItems={"left"} border="1px grey">
                        <Checkbox
                            onChange={(e) => {
                                setUseMockData(!useMockData);
                            }}
                        >
                            <Text as="u">Use Mock Data</Text>
                        </Checkbox>
                        <Checkbox
                            onChange={(e) => {
                                setCompany(e.target.checked ? "1" : "2");
                            }}
                        >
                            <Text as="u">Use Company 1 Algorithm</Text>
                        </Checkbox>
                    </VStack>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};

export default DeveloperSettings;
