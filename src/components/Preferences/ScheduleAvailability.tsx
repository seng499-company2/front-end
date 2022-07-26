import { TabList, Tabs, Tab, TabPanel, TabPanels } from "@chakra-ui/react";
import useProfPrefMeta from "@hooks/useProfPrefMeta";
import { useFormikContext } from "formik";
import { useCallback, useEffect, useMemo } from "react";
import { PreferencesFormType } from "src/types/preferences";
import Timetable from "./ScheduleSelector";

const COMPLETE_SEMESTERS = ["fall", "spring", "summer"];

/*
ScheduleAvailability requirements:

Research Professors (profType === "RP")
    Full Leave (sabbatical.duration === "FULL")
        12 months, starts in July
            Not allowed to fill out preferred times for any semester – set to null

    Half Leave (sabbatical.duration === "HALF")
        6 months, starts in January or July
            January: Spring and Summer off
                Fall:
                    Preferred times is fillable
                Spring and Summer:
                    Preferred times is not fillable (disabled) – set to null
            July: Summer and Fall off
                Spring:
                    Preferred times is fillable
                Fall and Summer:
                    Preferred times is not fillable (disabled) – set to null

    No Leave (sabbatical.value === false)
        Preferred times for the non-teaching semester is not fillable – set to null

Teaching Professors
    Full Leave
        8 months, starts in January, May, or September
            January: Spring and Summer off
                Fall:
                    Preferred times is fillable
                Spring and Summer:
                    Preferred number of courses must be 0
            May: Summer and Fall off
                Spring:
                    Preferred times is fillable
                Summer and Fall:
                    Preferred times is not fillable (disabled) – set to null
            September: Fall and Spring off
                Summer:
                    Preferred times is fillable
                Fall and Spring:
                    Preferred times is not fillable (disabled) – set to null

    Half Leave
        4 months, starts in January, May, or September
            January: Spring off
                Fall and Summer:
                    Preferred times is fillable
                Spring:
                    Preferred times is not fillable (disabled) – set to null
            May: Summer off
                Fall and Spring:
                    Preferred times is fillable
                Summer:
                    Preferred times is not fillable (disabled) – set to null
            September: Fall off
                Spring and Summer:
                    Preferred times is fillable
                Fall:
                    Preferred times is not fillable (disabled) – set to null

    No Leave
        Preferred times for the non-teaching semester is fillable
*/
function determineFillableSemesters(sabbatical, profType, nonTeachingSemester) {
    const { value, duration, fromMonth } = sabbatical;
    const isResearchProf = profType === "RP";

    if (isResearchProf) {
        // Research Professors
        if (!value) {
            // No Leave
            // Preferred times for the non-teaching semester is not fillable
            return ["fall", "summer", "spring"].filter(
                (semester) => semester !== nonTeachingSemester
            );
        }
        if (duration === "FULL") {
            // Full Leave
            return [];
        } else if (duration === "HALF") {
            // Half Leave
            if (fromMonth === "1") {
                // January
                return ["fall"];
            } else if (fromMonth === "7") {
                // July
                return ["spring"];
            }
        }
    } else if (!isResearchProf) {
        // Teaching Professors
        if (!value) {
            // No Leave
            return ["fall", "summer", "spring"];
        }
        if (duration === "FULL") {
            // Full Leave
            switch (fromMonth) {
                case "1":
                    // January
                    return ["fall"];
                case "5":
                    // May
                    return ["spring"];
                case "9":
                    // September
                    return ["summer"];
                default:
                    // Invalid
                    return ["fall", "spring", "summer"];
            }
        } else if (duration === "HALF") {
            // Half Leave
            switch (fromMonth) {
                case "1":
                    // January
                    return ["fall", "summer"];
                case "5":
                    // May
                    return ["fall", "spring"];
                case "9":
                    // September
                    return ["spring", "summer"];
                default:
                    // Invalid
                    return ["fall", "spring", "summer"];
            }
        }
    }

    return ["fall", "spring", "summer"];
}

const ScheduleAvailability = () => {
    const { profType } = useProfPrefMeta();
    const {
        values: { sabbatical, nonTeachingSemester, preferredTime },
        setFieldValue,
    } = useFormikContext<PreferencesFormType>();

    console.log(preferredTime);

    const fillableSems = useMemo(
        () =>
            determineFillableSemesters(
                sabbatical,
                profType,
                nonTeachingSemester
            ),
        [sabbatical, profType, nonTeachingSemester]
    );

    // const formValue = `preferredTime.${semester}`;
    // setFieldValue(formValue, convertToJsonArr(newSchedule));

    // set the preferred times for the terms not in the fillable semesters to null
    const setPreferredTimes = useCallback(
        (semester, value) => {
            const formValue = `preferredTime.${semester}`;
            setFieldValue(formValue, value);
        },
        [setFieldValue]
    );

    // if semester in complete semesters but not in fillable semesters, set preferred times to null
    const setPreferredTimesIfNotFillable = useCallback(
        (semester) => {
            if (
                COMPLETE_SEMESTERS.includes(semester) &&
                !fillableSems.includes(semester) &&
                preferredTime[semester] !== null
            ) {
                setPreferredTimes(semester, null);
            }
        },
        [fillableSems, preferredTime, setPreferredTimes]
    );

    useEffect(() => {
        for (const semester of COMPLETE_SEMESTERS) {
            setPreferredTimesIfNotFillable(semester);
        }
    }, [fillableSems, setPreferredTimesIfNotFillable, sabbatical]);

    return (
        <Tabs variant="solid-rounded" colorScheme="green" isLazy>
            <TabList>
                <Tab isDisabled={!fillableSems.includes("fall")}>Fall</Tab>
                <Tab isDisabled={!fillableSems.includes("spring")}>Spring</Tab>
                <Tab isDisabled={!fillableSems.includes("summer")}>Summer</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Timetable semester="fall" />
                </TabPanel>
                <TabPanel>
                    <Timetable semester="summer" />
                </TabPanel>
                <TabPanel>
                    <Timetable semester="spring" />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default ScheduleAvailability;
