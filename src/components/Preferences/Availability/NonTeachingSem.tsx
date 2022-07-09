import { FormControl, FormLabel } from "@chakra-ui/react";
import { Select } from "chakra-react-select";

const labels = {
    fall: "Fall",
    spring: "Spring",
    summer: "Summer",
};

const NonTeachingSem = ({ setFieldValue, value, isDisabled }) => {
    return (
        <FormControl>
            <FormLabel>Preferred Non-Teaching Semester</FormLabel>
            <Select
                name="nonTeachingSemester"
                instanceId={"nonTeachingSemester-select"}
                selectedOptionColor="primary"
                value={{ label: labels[value], value }}
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
