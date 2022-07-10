import { FormControl, FormLabel, HStack, Text } from "@chakra-ui/react";

import NumInput from "@components/NumInput";

const CoursesPerSemester = ({
    setFieldValue,
    isDisabled = false,
    defaultValue,
}) => {
    return (
        <FormControl>
            <FormLabel>
                Preferred Number of Teaching Courses per Semester
            </FormLabel>
            <HStack align="left">
                <Text alignSelf="center" mb={0}>
                    Fall
                </Text>
                <NumInput
                    name="numCoursesPerSem.fall"
                    isDisabled={isDisabled}
                    max={5}
                    min={0}
                    value={+defaultValue.fall}
                    onChange={(v) => setFieldValue("numCoursesPerSem.fall", v)}
                />
                <Text alignSelf="center" pl={10}>
                    Spring
                </Text>
                <NumInput
                    name="numCoursesPerSem.spring"
                    isDisabled={isDisabled}
                    max={5}
                    min={0}
                    value={+defaultValue.spring}
                    onChange={(v) =>
                        setFieldValue("numCoursesPerSem.spring", v)
                    }
                />
                <Text alignSelf="center" pl={10}>
                    Summer
                </Text>
                <NumInput
                    name="numCoursesPerSem.summer"
                    isDisabled={isDisabled}
                    max={5}
                    min={0}
                    value={+defaultValue.summer}
                    onChange={(v) =>
                        setFieldValue("numCoursesPerSem.summer", v)
                    }
                />
            </HStack>
        </FormControl>
    );
};

export default CoursesPerSemester;
