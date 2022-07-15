import { ButtonGroup, Button } from "@chakra-ui/react";

const EditDaysControl = () => {
    return (
        <ButtonGroup
            size="sm"
            isAttached
            //variant="outline"
        >
            <Button>S</Button>
            <Button>M</Button>
            <Button>T</Button>
            <Button>W</Button>
            <Button>T</Button>
            <Button>F</Button>
            <Button>S</Button>
        </ButtonGroup>
    );
};

export default EditDaysControl;
