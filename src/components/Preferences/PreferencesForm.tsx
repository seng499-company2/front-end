import { Button, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import Availability from "./Availability";
import CoursesPreferencesTable from "./CoursePreferencesTable";
import ScheduleAvailability from "./ScheduleAvailability";
import DividerHeading from "../DividerHeading";

const PreferencesForm = (props) => {
    const {
        isDisabled,
        isProfessorPage = false,
        initialValues,
        handleSubmit,
        isError,
        isLoading = false,
    } = props;
    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
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
                        {!isProfessorPage && (
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
