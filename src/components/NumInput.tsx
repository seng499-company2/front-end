import {
    NumberInput,
    NumberIncrementStepper,
    NumberDecrementStepper,
    NumberInputStepper,
    NumberInputField,
} from "@chakra-ui/react";

const NumInput = (props) => {
    const { id, isDisabled, min, max, onChange } = props;
    return (
        <NumberInput
            allowMouseWheel
            max={max}
            min={min}
            keepWithinRange={true}
            id={id}
            isDisabled={isDisabled}
            onChange={onChange}
            defaultValue={0}
            width={20}
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
