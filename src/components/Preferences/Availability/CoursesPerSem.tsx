import { FormControl, FormLabel, HStack, Text } from "@chakra-ui/react";

import NumInput from "@components/NumInput";
import useProfPrefMeta from "@hooks/useProfPrefMeta";
import { useFormikContext } from "formik";
import { PreferencesFormType } from "src/types/preferences";

const CoursesPerSemester = () => {
    const {
        values: { numCoursesPerSem, nonTeachingSemester },
        setFieldValue,
    } = useFormikContext<PreferencesFormType>();
    const { profType, isDisabled } = useProfPrefMeta();

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
                    isDisabled={isDisabled || nonTeachingSemester === "fall"}
                    max={5}
                    min={0}
                    value={+numCoursesPerSem.fall}
                    onChange={(v) => setFieldValue("numCoursesPerSem.fall", v)}
                />
                <Text alignSelf="center" pl={10}>
                    Spring
                </Text>
                <NumInput
                    name="numCoursesPerSem.spring"
                    isDisabled={isDisabled || nonTeachingSemester === "spring"}
                    max={5}
                    min={0}
                    value={+numCoursesPerSem.spring}
                    onChange={(v) =>
                        setFieldValue("numCoursesPerSem.spring", v)
                    }
                />
                <Text alignSelf="center" pl={10}>
                    Summer
                </Text>
                <NumInput
                    name="numCoursesPerSem.summer"
                    isDisabled={isDisabled || nonTeachingSemester === "summer"}
                    max={5}
                    min={0}
                    value={+numCoursesPerSem.summer}
                    onChange={(v) =>
                        setFieldValue("numCoursesPerSem.summer", v)
                    }
                />
            </HStack>
        </FormControl>
    );
};

export default CoursesPerSemester;
