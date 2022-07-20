import { FormControl, FormLabel, HStack, Text } from "@chakra-ui/react";

import NumInput from "@components/NumInput";

const CoursesPerSemester = ({ setFieldValue, isDisabled = false, value }) => {
    const fallDisabled = isDisabled || value.nonTeachingSemester === "fall";
    const springDisabled = isDisabled || value.nonTeachingSemester === "spring";
    const summerDisabled = isDisabled || value.nonTeachingSemester === "summer";
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
                    isDisabled={fallDisabled}
                    max={5}
                    min={0}
                    value={fallDisabled ? 0 : +value.numCoursesPerSem.fall} //help
                    onChange={(v) => setFieldValue("numCoursesPerSem.fall", v)}
                />
                <Text alignSelf="center" pl={10}>
                    Spring
                </Text>
                <NumInput
                    name="numCoursesPerSem.spring"
                    isDisabled={springDisabled}
                    max={5}
                    min={0}
                    value={+value.numCoursesPerSem.spring}
                    onChange={(v) =>
                        setFieldValue("numCoursesPerSem.spring", v)
                    }
                />
                <Text alignSelf="center" pl={10}>
                    Summer
                </Text>
                <NumInput
                    name="numCoursesPerSem.summer"
                    isDisabled={summerDisabled}
                    max={5}
                    min={0}
                    value={+value.numCoursesPerSem.summer}
                    onChange={(v) =>
                        setFieldValue("numCoursesPerSem.summer", v)
                    }
                />
            </HStack>
        </FormControl>
    );
};

export default CoursesPerSemester;
