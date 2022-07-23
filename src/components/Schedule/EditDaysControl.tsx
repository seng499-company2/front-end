import { ButtonGroup, Button, useColorModeValue } from "@chakra-ui/react";

const EditDaysControl = ({ isThick, disabled }) => {
    return (
        <ButtonGroup
            size={isThick ? "md" : "sm"}
            isAttached
            isDisabled={disabled}
        >
            <Button variant="days" isActive={false} height={isThick && 30}>
                S
            </Button>
            <Button variant="days" isActive={false} height={isThick && 30}>
                M
            </Button>
            <Button variant="days" isActive={true} height={isThick && 30}>
                T
            </Button>
            <Button variant="days" isActive={true} height={isThick && 30}>
                W
            </Button>
            <Button variant="days" isActive={false} height={isThick && 30}>
                T
            </Button>
            <Button variant="days" isActive={true} height={isThick && 30}>
                F
            </Button>
            <Button variant="days" isActive={false} height={isThick && 30}>
                S
            </Button>
        </ButtonGroup>
    );
};

export default EditDaysControl;
