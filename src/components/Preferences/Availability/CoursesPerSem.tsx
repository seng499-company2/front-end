import { FormControl, FormLabel, HStack, Text } from "@chakra-ui/react";

import NumInput from "@components/NumInput";
import useProfPrefMeta from "@hooks/useProfPrefMeta";
import { useFormikContext } from "formik";
import { PreferencesFormType } from "src/types/preferences";

/*
CoursesPerSemester requirements:

Research Professors (profType === "RP")
    Full Leave (sabbatical.duration === "FULL")
        12 months, starts in July
            Preferred courses per semester is zero for all semesters

    Half Leave (sabbatical.duration === "HALF")
        6 months, starts in January or July
            January: Spring and Summer off
                Fall:
                    Preferred number of courses should be >1
                Spring and Summer:
                    Preferred number of courses must be 0
            July: Summer and Fall off
                Spring:
                    Preferred number of courses should be >1
                Fall and Summer:
                    Preferred number of courses must be 0


    No Leave (sabbatical.value === false)
        Preferred number of courses for the non-teaching semester must be 0
        Preferred number of courses for the other two semesters should add up to >3

Teaching Professors
    Full Leave
        8 months, starts in January, May, or September
            January: Spring and Summer off
                Fall:
                    Preferred number of courses should be >2
                Spring and Summer:
                    Preferred number of courses must be 0
            May: Summer and Fall off
                Spring:
                    Preferred number of courses should be >2
                Summer and Fall:
                    Preferred number of courses must be 0
            September: Fall and Spring off
                Summer:
                    Preferred number of courses should be >2
                Fall and Spring:
                    Preferred number of courses must be 0

    Half Leave
        4 months, starts in January, May, or September
            January: Spring off
                Fall and Summer:
                    Preferred number of courses should add up to >3
                Spring:
                    Preferred number of courses must be 0
            May: Summer off
                Fall and Spring:
                    Preferred number of courses should add up to >3
                Summer:
                    Preferred number of courses must be 0
            September: Fall off
                Spring and Summer:
                    Preferred number of courses should add up to >3
                Fall:
                    Preferred number of courses must be 0

    No Leave
        Preferred number of courses for the non-teaching semester can be any number
        Preferred number of courses for all three semesters should add up to >6
*/

function statusForEachSemester(
    numCoursesPerSem,
    profType: "RP" | "TP",
    nonTeachingSemester,
    sabbatical
) {
    const semesters = ["fall", "spring", "summer"];

    if (profType === "RP") {
        // Research Professor
        if (sabbatical.duration === "FULL") {
            // Full Leave
            return semesters.map((semester) => {
                // All semesters are disabled with value 0
                return { semester, isDisabled: true, value: 0 };
            });
        } else if (sabbatical.duration === "HALF") {
            // Half Leave
            if (sabbatical.fromMonth === "1") {
                // January
                return semesters.map((semester) => {
                    if (semester === "spring" || semester === "summer") {
                        // Spring and Summer off
                        return { semester, isDisabled: true, value: 0 };
                    }
                    return {
                        semester,
                        isDisabled: false,
                        value: numCoursesPerSem.fall || 1,
                        min: 1,
                    };
                });
            } else {
                // July
                return semesters.map((semester) => {
                    // Summer and Fall off
                    if (semester === "summer" || semester === "fall") {
                        return { semester, isDisabled: true, value: 0 };
                    }
                    return {
                        semester,
                        isDisabled: false,
                        value: numCoursesPerSem.spring || 1,
                        min: 1,
                    };
                });
            }
        } else {
            // No Leave
            return semesters.map((semester) => {
                if (semester === nonTeachingSemester) {
                    // Non-teaching semester is disabled with value 0
                    return { semester, isDisabled: true, value: 0 };
                }
                // Preferred number of courses for the other two semesters should add up to >3
                return {
                    semester,
                    isDisabled: false,
                    value: numCoursesPerSem[semester],
                    min: 0,
                    sum: 3,
                };
            });
        }
    } else {
        // Teaching Professor
        if (sabbatical.duration === "FULL") {
            // Full Leave
            if (sabbatical.fromMonth === "1") {
                // January
                return semesters.map((semester) => {
                    if (semester === "spring" || semester === "summer") {
                        // Spring and Summer off
                        return { semester, isDisabled: true, value: 0 };
                    }
                    return {
                        semester,
                        isDisabled: false,
                        value: numCoursesPerSem.fall || 2,
                        min: 2,
                    };
                });
            } else if (sabbatical.fromMonth === "5") {
                // May
                return semesters.map((semester) => {
                    if (semester === "summer" || semester === "fall") {
                        // Summer and Fall off
                        return { semester, isDisabled: true, value: 0 };
                    }
                    return {
                        semester,
                        isDisabled: false,
                        value: numCoursesPerSem.spring || 2,
                        min: 2,
                    };
                });
            } else if (sabbatical.fromMonth === "9") {
                // September
                return semesters.map((semester) => {
                    if (semester === "fall" || semester === "spring") {
                        // Fall and Spring off
                        return { semester, isDisabled: true, value: 0 };
                    }
                    return {
                        semester,
                        isDisabled: false,
                        value: numCoursesPerSem.summer || 2,
                        min: 2,
                    };
                });
            }
        } else if (sabbatical.duration === "HALF") {
            // Half Leave
            if (sabbatical.fromMonth === "1") {
                // January
                return semesters.map((semester) => {
                    if (semester === "spring") {
                        // Spring off
                        return { semester, isDisabled: true, value: 0 };
                    }
                    return {
                        semester,
                        isDisabled: false,
                        value: numCoursesPerSem[semester] || 0,
                        min: 0,
                        sum: 3,
                    };
                });
            } else if (sabbatical.fromMonth === "5") {
                // May
                return semesters.map((semester) => {
                    if (semester === "summer") {
                        // Summer off
                        return { semester, isDisabled: true, value: 0 };
                    }
                    return {
                        semester,
                        isDisabled: false,
                        value: numCoursesPerSem[semester] || 0,
                        min: 0,
                        sum: 3,
                    };
                });
            } else if (sabbatical.fromMonth === "9") {
                // September
                return semesters.map((semester) => {
                    if (semester === "fall") {
                        // Fall off
                        return { semester, isDisabled: true, value: 0 };
                    }
                    return {
                        semester,
                        isDisabled: false,
                        value: numCoursesPerSem[semester] || 0,
                        min: 0,
                        sum: 3,
                    };
                });
            }
        } else {
            // No Leave
            return semesters.map((semester) => {
                if (semester === nonTeachingSemester) {
                    // Non-teaching semester is disabled with value 0
                    return {
                        semester,
                        isDisabled: false,
                        value: numCoursesPerSem[semester],
                    };
                }
                // Preferred number of courses for the other two semesters should add up to >6
                return {
                    semester,
                    isDisabled: false,
                    value: numCoursesPerSem[semester],
                    min: 0,
                    sum: 6,
                };
            });
        }
    }
}

const CoursesPerSemester = () => {
    const {
        values: { numCoursesPerSem, nonTeachingSemester, sabbatical },
        setFieldValue,
    } = useFormikContext<PreferencesFormType>();
    const { profType, isDisabled } = useProfPrefMeta();

    const result = statusForEachSemester(
        numCoursesPerSem,
        profType,
        nonTeachingSemester,
        sabbatical
    );

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
