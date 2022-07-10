import {
    Text,
    FormControl,
    FormLabel,
    Checkbox,
    Select,
} from "@chakra-ui/react";
import { Field } from "formik";

const Sabbatical = ({ value, isDisabled = false }) => {
    return (
        <FormControl>
            <FormLabel>Sabbatical Preferences</FormLabel>
            <Field
                as={Checkbox}
                name="sabbatical.value"
                isDisabled={isDisabled}
                defaultChecked={value}
            >
                Taking Sabbatical
            </Field>

            {value && (
                <>
                    <Text mt={5}>Sabbatical Length</Text>
                    <Field
                        as={Select}
                        name="sabbatical.duration"
                        isDisabled={isDisabled}
                        colorScheme="primary.100"
                        variant="filled"
                        focusBorderColor="primary.500"
                    >
                        <option value="HALF">Half leave</option>
                        <option value="FULL">Full leave</option>
                    </Field>
                    <Text mt={5}>Sabbatical Start Month</Text>
                    <Field
                        as={Select}
                        name="sabbatical.fromMonth"
                        isDisabled={isDisabled}
                        colorScheme="primary"
                        variant="filled"
                    >
                        <option value="1">January</option>
                        <option value="5">May</option>
                        <option value="9">September</option>
                    </Field>
                </>
            )}
        </FormControl>
    );
};

export default Sabbatical;
