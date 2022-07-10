import { Button, Text, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import Availability from "./Availability";
import CoursesPreferencesTable from "./CoursePreferencesTable";
import ScheduleAvailability from "./ScheduleAvailability";
import DividerHeading from "../DividerHeading";
import { usePostQuery } from "@hooks/useRequest";
import useAuth from "@hooks/useAuth";

// convert from our format to the the format backend wants
function convertToBackendFormat(data) {
    const backendData = {
        professor: data.professor,
        is_submitted: true,
        taking_sabbatical: data.sabbatical.value,
        sabbatical_length: data.sabbatical.duration,
        sabbatical_start_month: +data.sabbatical.fromMonth,
        preferred_times: data.preferredTime,
        courses_preferences: data.coursePreferences,
        preferred_non_teaching_semester: data.nonTeachingSemester,
        preferred_courses_per_semester: data.numCoursesPerSem,
        preferred_number_teaching_days: data.teachingDaysPerWeek,
        preferred_course_day_spreads: data.preferredDays,
    };
    return backendData;
}

const PreferencesForm = ({ isDisabled, initialValues }) => {
    const { user } = useAuth();
    const { isError, isLoading, execute } = usePostQuery("/api/preferences/");
    const toast = useToast({
        position: "bottom-right",
        duration: 5000,
        isClosable: true,
        status: "success",
    });

    const onSubmit = async (data) => {
        console.log(data);
        await execute({
            data: convertToBackendFormat({ ...data, professor: user.username }),
        });
        toast({
            title: "Preferences saved!",
            description: "Your preferences have been saved.",
        });
    };

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            {({ errors, touched, values, setFieldValue }) => {
                const {
                    nonTeachingSemester,
                    numCoursesPerSem,
                    sabbatical,
                    preferredDays,
                    teachingDaysPerWeek,
                } = values;

                const availabilityValues = {
                    nonTeachingSemester,
                    numCoursesPerSem,
                    sabbatical,
                    preferredDays,
                    teachingDaysPerWeek,
                };

                return (
                    <Form id="preferences-form">
                        <DividerHeading title="General Preferences" />
                        <Availability
                            setFieldValue={setFieldValue}
                            values={availabilityValues}
                            isDisabled={isDisabled}
                        />
                        <DividerHeading title="Course Preferences" mt={20} />
                        <CoursesPreferencesTable
                            values={values.coursePreferences}
                            setFieldValue={setFieldValue}
                            isDisabled={isDisabled}
                        />
                        <DividerHeading title="Schedule Preferences" mt={20} />
                        <ScheduleAvailability
                            values={values.preferredTime}
                            setFieldValue={setFieldValue}
                            isDisabled={isDisabled}
                        />
                        {isError && (
                            <Text fontSize="sm" color="red.500">
                                There was an error saving your preferences.
                            </Text>
                        )}
                        {!isDisabled && (
                            <Button
                                type="submit"
                                isDisabled={isDisabled}
                                colorScheme={isError ? "red" : "primary"}
                                isLoading={isLoading}
                                mt={5}
                            >
                                {isError ? "Try Again" : "Submit"}
                            </Button>
                        )}
                    </Form>
                );
            }}
        </Formik>
    );
};

export default PreferencesForm;
