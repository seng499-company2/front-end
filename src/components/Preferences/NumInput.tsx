import {
    NumberInput,
    NumberIncrementStepper,
    NumberDecrementStepper,
    NumberInputStepper,
    NumberInputField,
} from "@chakra-ui/react";

const NumInput = (props) => {
    const { id, isDisabled } = props;
    return (
        <NumberInput
            allowMouseWheel
            defaultValue={0}
            max={5}
            min={0}
            keepWithinRange={true}
            clampValueOnBlur={true}
            w="60px"
            id={id}
            isDisabled={isDisabled}
        >
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    );
};

export default NumInput;
