import {
    Text,
    FormControl,
    FormLabel,
    Checkbox,
    Select,
} from "@chakra-ui/react";
import useProfPrefMeta from "@hooks/useProfPrefMeta";
import { FastField, Field, useFormikContext } from "formik";
import { useEffect } from "react";
import { PreferencesFormType } from "src/types/preferences";

const Sabbatical = () => {
    const {
        values: { sabbatical },
        setFieldValue,
    } = useFormikContext<PreferencesFormType>();
    const { profType, isDisabled } = useProfPrefMeta();
    const { value, duration, fromMonth } = sabbatical;

    const isResearchProf = profType === "RP";

    useEffect(() => {
        if (value && duration === "NONE") {
            setFieldValue("sabbatical.duration", "HALF");
            setFieldValue("sabbatical.fromMonth", "1");
        }
    }, [duration, setFieldValue, value]);

    return (
        <FormControl>
            <FormLabel>Sabbatical Preferences</FormLabel>
            <FastField
                as={Checkbox}
                name="sabbatical.value"
                isChecked={value}
                isDisabled={isDisabled}
            >
                Taking Sabbatical
            </FastField>

            {value && isResearchProf && (
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
                        <option value="HALF">Half leave (6 months)</option>
                        <option value="FULL">Full leave (12 months)</option>
                    </Field>
                    <Text mt={5}>Sabbatical Start Month</Text>
                    <Field
                        as={Select}
                        name="sabbatical.fromMonth"
                        isDisabled={isDisabled}
                        colorScheme="primary"
                        variant="filled"
                    >
                        <option value="7">July</option>
                        {duration === "HALF" && (
                            <option value="1">January</option>
                        )}
                    </Field>
                </>
            )}

            {value && !isResearchProf && (
                <>
                    <Text mt={5}>Sabbatical Length</Text>
                    <Field
                        as={Select}
                        name="sabbatical.duration"
                        isDisabled={isDisabled}
                        colorScheme="primary.100"
                        variant="filled"
                        focusBorderColor="primary.500"
                        value={duration === "NONE" ? "HALF" : duration}
                    >
                        <option value="HALF">Half leave (4 months)</option>
                        <option value="FULL">Full leave (8 months)</option>
                    </Field>
                    <Text mt={5}>Sabbatical Start Month</Text>
                    <Field
                        as={Select}
                        name="sabbatical.fromMonth"
                        isDisabled={isDisabled}
                        colorScheme="primary"
                        variant="filled"
                        value={fromMonth || "1"}
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
