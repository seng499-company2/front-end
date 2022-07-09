import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import Availability from "./Availability";
import CoursesPreferencesTable from "./CoursesPreferencesTable";
import ScheduleAvailability from "./ScheduleAvailability";
import DividerHeading from "../DividerHeading";
import { usePostQuery } from "@hooks/useRequest";

const PreferencesForm = ({ isDisabled, initialValues }) => {
    const { execute } = usePostQuery("/api/preferences/");

    const onSubmit = async (values) => {
        alert(JSON.stringify(values, null, 2));
        console.log(values);
        await execute(values);
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
                            values={values}
                            setFieldValue={setFieldValue}
                            isDisabled={isDisabled}
                        />
                        {!isDisabled && (
                            <Button mt={5} type="submit">
                                Submit
                            </Button>
                        )}
                    </Form>
                );
            }}
        </Formik>
    );
};

export default PreferencesForm;
