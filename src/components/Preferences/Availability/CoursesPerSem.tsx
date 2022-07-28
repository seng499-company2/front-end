import {
    Box,
    FormControl,
    FormLabel,
    HStack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";

import NumInput from "@components/NumInput";
import useProfPrefMeta from "@hooks/useProfPrefMeta";
import { useFormikContext } from "formik";
import { useEffect, useMemo } from "react";
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
        if (!sabbatical.value) {
            // No Leave
            return {
                sum: 3,
                semesters: semesters.map((semester) => {
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
                    };
                }),
            };
        }
        if (sabbatical.duration === "FULL") {
            // Full Leave
            return {
                sum: null,
                semesters: semesters.map((semester) => {
                    // All semesters are disabled with value 0
                    return { semester, isDisabled: true, value: 0 };
                }),
            };
        } else if (sabbatical.duration === "HALF") {
            // Half Leave
            if (sabbatical.fromMonth === "1") {
                // January
                return {
                    sum: null,
                    semesters: semesters.map((semester) => {
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
                    }),
                };
            } else {
                // July
                return {
                    sum: null,
                    semesters: semesters.map((semester) => {
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
                    }),
                };
            }
        }
    } else {
        // Teaching Professor
        if (!sabbatical.value) {
            // No Leave
            return {
                sum: 6,
                semesters: semesters.map((semester) => {
                    if (semester === nonTeachingSemester) {
                        // Non-teaching semester is disabled with value 0
                        return {
                            semester,
                            isDisabled: true,
                            value: numCoursesPerSem[semester],
                        };
                    }
                    // Preferred number of courses for the other two semesters should add up to >6
                    return {
                        semester,
                        isDisabled: false,
                        value: numCoursesPerSem[semester],
                        min: 0,
                    };
                }),
            };
        }
        if (sabbatical.duration === "FULL") {
            // Full Leave
            if (sabbatical.fromMonth === "1") {
                // January
                return {
                    sum: null,
                    semesters: semesters.map((semester) => {
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
                    }),
                };
            } else if (sabbatical.fromMonth === "5") {
                // May
                return {
                    sum: null,
                    semesters: semesters.map((semester) => {
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
                    }),
                };
            } else if (sabbatical.fromMonth === "9") {
                // September
                return {
                    sum: null,
                    semesters: semesters.map((semester) => {
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
                    }),
                };
            }
        } else if (sabbatical.duration === "HALF") {
            // Half Leave
            if (sabbatical.fromMonth === "1") {
                // January
                return {
                    sum: 3,
                    semesters: semesters.map((semester) => {
                        if (semester === "spring") {
                            // Spring off
                            return { semester, isDisabled: true, value: 0 };
                        }
                        return {
                            semester,
                            isDisabled: false,
                            value: numCoursesPerSem[semester] || 0,
                            min: 0,
                        };
                    }),
                };
            } else if (sabbatical.fromMonth === "5") {
                // May
                return {
                    sum: 3,
                    semesters: semesters.map((semester) => {
                        if (semester === "summer") {
                            // Summer off
                            return { semester, isDisabled: true, value: 0 };
                        }
                        return {
                            semester,
                            isDisabled: false,
                            value: numCoursesPerSem[semester] || 0,
                            min: 0,
                        };
                    }),
                };
            } else if (sabbatical.fromMonth === "9") {
                // September
                return {
                    sum: 3,
                    semesters: semesters.map((semester) => {
                        if (semester === "fall") {
                            // Fall off
                            return { semester, isDisabled: true, value: 0 };
                        }
                        return {
                            semester,
                            isDisabled: false,
                            value: numCoursesPerSem[semester] || 0,
                            min: 0,
                        };
                    }),
                };
            }
        }
    }

    return {
        sum: null,
        semesters: semesters.map((semester) => {
            return {
                semester,
                isDisabled: false,
                value: numCoursesPerSem[semester],
                min: 0,
            };
        }),
    };
}

const formatSemesterName = (semester: string) => {
    return semester.charAt(0).toUpperCase() + semester.slice(1);
};

const sumCoursersPerSemester = (coursesPerSemester) => {
    return (
        Number(coursesPerSemester.fall) +
        Number(coursesPerSemester.spring) +
        Number(coursesPerSemester.summer)
    );
};

const CoursesPerSemester = () => {
    const {
        values: { numCoursesPerSem, nonTeachingSemester, sabbatical },
        setFieldValue,
    } = useFormikContext<PreferencesFormType>();
    const { profType, isDisabled } = useProfPrefMeta();
    const errorBgColor = useColorModeValue("red.100", "red.400");

    const semestersReq = useMemo(
        () =>
            statusForEachSemester(
                numCoursesPerSem,
                profType,
                nonTeachingSemester,
                sabbatical
            ),
        [numCoursesPerSem, profType, nonTeachingSemester, sabbatical]
    );

    const { semesters } = semestersReq;
    console.log({ semesters });

    useEffect(() => {
        // update numCoursesPerSem based on sabbatical
        if (sabbatical.value) {
            semesters.forEach((semester) => {
                if (
                    semester.isDisabled &&
                    numCoursesPerSem[semester.semester] != 0
                ) {
                    setFieldValue(`numCoursesPerSem.${semester.semester}`, 0);
                } else if (
                    semester.value &&
                    numCoursesPerSem[semester.semester] != semester.value
                ) {
                    setFieldValue(
                        `numCoursesPerSem.${semester.semester}`,
                        semester.value
                    );
                }
            });
        }
    }, [numCoursesPerSem, sabbatical.value, semesters, setFieldValue]);

    const targetSum = semestersReq.sum ?? 0;
    const actualSum = sumCoursersPerSemester(numCoursesPerSem);
    const sumInvalid = actualSum < targetSum;

    const sumValidMessage = sumInvalid ? (
        <HStack
            spacing={4}
            bg={errorBgColor}
            borderRadius={"md"}
            justifyContent={"space-between"}
            my={4}
            p={2}
        >
            <Text fontSize="sm" colorScheme="primary">
                You have a total of {actualSum} courses. You need to give at
                least {targetSum}. Please add more courses.
            </Text>
        </HStack>
    ) : null;

    return (
        <FormControl isInvalid={sumInvalid}>
            <FormLabel>
                Preferred Number of Teaching Courses per Semester
            </FormLabel>
            <HStack alignItems="center" justifyContent={"space-evenly"} gap={6}>
                {semesters.map((semester, idx) => {
                    console.log({ semester });
                    const semesterKey = semester.semester;
                    const semesterDisplay = formatSemesterName(semesterKey);
                    return (
                        <Box key={idx} alignSelf="center" mb={0}>
                            <Text>{semesterDisplay}</Text>
                            <NumInput
                                name={`numCoursesPerSem.${semesterKey}`}
                                isDisabled={isDisabled || semester.isDisabled}
                                max={5}
                                min={semester.min ?? 0}
                                value={semester.value ?? 0}
                                onChange={(v) =>
                                    setFieldValue(
                                        `numCoursesPerSem.${semesterKey}`,
                                        v
                                    )
                                }
                            />
                        </Box>
                    );
                })}
            </HStack>
            {sumValidMessage && sumValidMessage}
        </FormControl>
    );
};

export default CoursesPerSemester;
