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
        values: { nonTeachingSemester, sabbatical },
        setFieldValue,
    } = useFormikContext<PreferencesFormType>();
    const { isDisabled } = useProfPrefMeta();

    const notAllowed = sabbatical.value;

    const selectValue = notAllowed
        ? { value: null, label: "Not Allowed" }
        : {
              value: nonTeachingSemester,
              label: labels[nonTeachingSemester],
          };

    return (
        <FormControl>
            <FormLabel>Preferred Non-Teaching Semester</FormLabel>
            <Select
                name="nonTeachingSemester"
                instanceId={"nonTeachingSemester-select"}
                selectedOptionColor="primary"
                value={selectValue}
                isDisabled={isDisabled || notAllowed}
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
