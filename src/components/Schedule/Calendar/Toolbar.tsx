import { Button, HStack } from "@chakra-ui/react";

const Toolbar = (props) => {
    const isWeek = props.view === "week";
    return (
        <HStack justifyContent={"end"} mb={4}>
            <HStack>
                <Button
                    isDisabled={isWeek}
                    onClick={() => props.onView("week")}
                >
                    Week
                </Button>
                <Button
                    isDisabled={!isWeek}
                    onClick={() => props.onView("day")}
                >
                    Day
                </Button>
            </HStack>
        </HStack>
    );
};

export default Toolbar;
