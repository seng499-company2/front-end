import { ButtonGroup, Button, useColorModeValue } from "@chakra-ui/react";

const EditDaysControl = () => {
    return (
        <ButtonGroup size="sm" isAttached isDisabled={true}>
            <Button variant="days" isActive={true}>
                S
            </Button>
            <Button variant="days" isActive={true}>
                M
            </Button>
            <Button variant="days" isActive={true}>
                T
            </Button>
            <Button variant="days" isActive={false}>
                W
            </Button>
            <Button variant="days" isActive={true}>
                T
            </Button>
            <Button variant="days" isActive={false}>
                F
            </Button>
            <Button variant="days" isActive={true}>
                S
            </Button>
        </ButtonGroup>
    );
};

export default EditDaysControl;
