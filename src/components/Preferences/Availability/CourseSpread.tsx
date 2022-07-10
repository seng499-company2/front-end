import { FormControl, FormLabel } from "@chakra-ui/react";
import {
    Select as MultiSelect,
    ActionMeta,
    MultiValue,
    OptionBase,
    GroupBase,
} from "chakra-react-select";

const labels = {
    M: "Monday",
    T: "Tuesday",
    W: "Wednesday",
    Th: "Thursday",
    F: "Friday",
    TWF: "TWF",
    MTh: "MTh",
};

interface PreferredDayOption extends OptionBase {
    label: string;
    value: string;
}

const preferredDayOptions: PreferredDayOption[] = [
    { label: "TWF", value: "TWF" },
    { label: "MTh", value: "MTh" },
    { label: "Monday", value: "M" },
    { label: "Tuesday", value: "T" },
    { label: "Wednesday", value: "W" },
    { label: "Thursday", value: "Th" },
    { label: "Friday", value: "F" },
];

const PreferredDays = ({ setFieldValue, values, isDisabled = false }) => {
    return (
        <FormControl>
            <FormLabel>Preferred Course Day Spreads</FormLabel>
            <MultiSelect<
                PreferredDayOption,
                true,
                GroupBase<PreferredDayOption>
            >
                isMulti
                isDisabled={isDisabled}
                value={values?.map((v) => ({
                    label: labels[v],
                    value: v,
                }))}
                instanceId="preferredDays-multi-select"
                options={preferredDayOptions}
                placeholder="Select preferred days"
                closeMenuOnSelect={false}
                selectedOptionStyle="check"
                hideSelectedOptions={false}
                onChange={(
                    option: MultiValue<PreferredDayOption>,
                    _actionMeta: ActionMeta<PreferredDayOption>
                ) => {
                    setFieldValue(
                        "preferredDays",
                        option.map((o) => o.value)
                    );
                }}
            />
        </FormControl>
    );
};

export default PreferredDays;
