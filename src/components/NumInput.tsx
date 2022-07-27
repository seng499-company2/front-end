import {
    NumberInput,
    NumberIncrementStepper,
    NumberDecrementStepper,
    NumberInputStepper,
    NumberInputField,
} from "@chakra-ui/react";

const NumInput = (props) => {
    const {
        id,
        isDisabled = false,
        min,
        max,
        onChange,
        defaultValue,
        value,
    } = props;
    return (
        <NumberInput
            allowMouseWheel
            max={max}
            min={min}
            keepWithinRange={true}
            id={id}
            isDisabled={isDisabled}
            onChange={onChange}
            defaultValue={defaultValue}
            value={value}
            width={100}
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
