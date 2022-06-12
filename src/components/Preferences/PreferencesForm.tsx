import {
    Button,
    Heading,
    Divider,
    Flex
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Availability from "./Availability";
import CoursesPreferencesTable from "./CoursesPreferencesTable";
import ScheduleAvailability from "./ScheduleAvailability";
import DividerHeading from "../DividerHeading";

const courses = [
    "CSC 225",
    "CSC 226",
    "ECE 260",
    "ECE 310",
    "SENG 265",
    "SENG 310",
];

const PreferencesForm = (props) => {
    const { handleSubmit } = props;

    return (
        <Formik
            initialValues={{
                numCoursesPerSem: {
                    fall: 0,
                    spring: 0,
                    summer: 0
                },
                // relief: {
                //     value: false,
                //     numCourses: 0,
                // },
                sabbatical: {
                    value: false,
                    duration: 0,
                    fromMonth: 'january'
                },
                teachingDaysPerWeek: {
                    value: 0,
                },
                preferredDays: {
                    monday: false,
                    tuesday: false,
                    wednesday: false,
                    thursday: false,
                    friday: false
                }
            }}
            onSubmit={(values) => {
                //handleSubmit(values);
                alert(JSON.stringify(values, null, 2));
            }}
        >
            {({ errors, touched, values, setFieldValue }) => (
                <Form id="preferences-form">
                    <DividerHeading title="General Preferences" />
                    <Availability setFieldValue={setFieldValue} values={values} />
                    <DividerHeading title="Course Preferences" mt={20} />
                    <CoursesPreferencesTable courses={courses} />
                    <DividerHeading title="Schedule Preferences" mt={20} />
                    <ScheduleAvailability />
                    <Button mt={5} type="submit">Submit</Button>
                </Form>
            )}
        </Formik>
    );
};

export default PreferencesForm;
