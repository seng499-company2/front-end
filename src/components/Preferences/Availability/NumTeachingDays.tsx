import { Text, FormControl, FormLabel, HStack } from "@chakra-ui/react";

import NumInput from "@components/NumInput";

const NumTeachingDays = ({ values, setFieldValue, isDisabled = false }) => {
    return (
        <FormControl>
            <FormLabel>Preferred Number of Teaching Days</FormLabel>
            <HStack align="left">
                <Text alignSelf="center">Fall</Text>
                <NumInput
                    name="teachingDaysPerWeek.fall"
                    isDisabled={isDisabled || values.fall == 0}
                    max={5}
                    min={0}
                    defaultValue={values.fall}
                    onChange={(v) =>
                        setFieldValue("teachingDaysPerWeek.fall", v)
                    }
                />
                <Text alignSelf="center" pl={10}>
                    Spring
                </Text>
                <NumInput
                    name="teachingDaysPerWeek.spring"
                    isDisabled={isDisabled || values.spring == 0}
                    max={5}
                    min={0}
                    defaultValue={values.spring}
                    onChange={(v) =>
                        setFieldValue("teachingDaysPerWeek.spring", v)
                    }
                />
                <Text alignSelf="center" pl={10}>
                    Summer
                </Text>
                <NumInput
                    name="teachingDaysPerWeek.summer"
                    isDisabled={isDisabled || values.summer == 0}
                    max={5}
                    min={0}
                    defaultValue={values.summer}
                    onChange={(v) =>
                        setFieldValue("teachingDaysPerWeek.summer", v)
                    }
                />
            </HStack>
        </FormControl>
    );
};

export default NumTeachingDays;
