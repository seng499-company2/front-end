import { Text, FormControl, FormLabel, HStack } from "@chakra-ui/react";

import NumInput from "@components/NumInput";

const NumTeachingDays = ({ values, setFieldValue, isDisabled = false }) => {
    const { teachingDaysPerWeek, numCoursesPerSem, nonTeachingSemester } =
        values;
    const termDisabled = {
        fall: numCoursesPerSem.fall == 0 || nonTeachingSemester === "fall",
        spring:
            numCoursesPerSem.spring == 0 || nonTeachingSemester === "spring",
        summer:
            numCoursesPerSem.summer == 0 || nonTeachingSemester === "summer",
    };

    return (
        <FormControl>
            <FormLabel>Preferred Number of Teaching Days</FormLabel>
            <HStack align="left">
                <Text alignSelf="center">Fall</Text>
                <NumInput
                    name="teachingDaysPerWeek.fall"
                    isDisabled={isDisabled || termDisabled.fall}
                    max={5}
                    min={0}
                    defaultValue={teachingDaysPerWeek.fall}
                    onChange={(v) =>
                        setFieldValue("teachingDaysPerWeek.fall", v)
                    }
                />
                <Text alignSelf="center" pl={10}>
                    Spring
                </Text>
                <NumInput
                    name="teachingDaysPerWeek.spring"
                    isDisabled={isDisabled || termDisabled.spring}
                    max={5}
                    min={0}
                    defaultValue={teachingDaysPerWeek.spring}
                    onChange={(v) =>
                        setFieldValue("teachingDaysPerWeek.spring", v)
                    }
                />
                <Text alignSelf="center" pl={10}>
                    Summer
                </Text>
                <NumInput
                    name="teachingDaysPerWeek.summer"
                    isDisabled={isDisabled || termDisabled.summer}
                    max={5}
                    min={0}
                    defaultValue={teachingDaysPerWeek.summer}
                    onChange={(v) =>
                        setFieldValue("teachingDaysPerWeek.summer", v)
                    }
                />
            </HStack>
        </FormControl>
    );
};

export default NumTeachingDays;
