import { FormControl, FormLabel } from "@chakra-ui/react";
import useProfPrefMeta from "@hooks/useProfPrefMeta";
import { Select } from "chakra-react-select";
import { useFormikContext } from "formik";
import { PreferencesFormType } from "src/types/preferences";

const labels = {
    fall: "Fall",
    spring: "Spring",
    summer: "Summer",
};

const NonTeachingSem = () => {
    const {
        values: { nonTeachingSemester },
        setFieldValue,
    } = useFormikContext<PreferencesFormType>();
    const { profType, isDisabled } = useProfPrefMeta();

    return (
        <FormControl>
            <FormLabel>Preferred Non-Teaching Semester</FormLabel>
            <Select
                name="nonTeachingSemester"
                instanceId={"nonTeachingSemester-select"}
                selectedOptionColor="primary"
                value={{
                    value: nonTeachingSemester,
                    label: labels[nonTeachingSemester],
                }}
                isDisabled={isDisabled}
                options={[
                    { value: "fall", label: "Fall" },
                    { value: "spring", label: "Spring" },
                    { value: "summer", label: "Summer" },
                ]}
                onChange={(v) => setFieldValue("nonTeachingSemester", v.value)}
            />
        </FormControl>
    );
};

export default NonTeachingSem;
