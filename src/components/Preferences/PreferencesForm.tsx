import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Availability from "./Availability";
import CoursesPreferencesTable from "./CoursesPreferencesTable";
import ScheduleAvailability from "./ScheduleAvailability";
import DividerHeading from "../DividerHeading";

const PreferencesForm = ({ isDisabled, initialValues }) => {
    //const { handleSubmit } = props;
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
                //handleSubmit(values);
                alert(JSON.stringify(values, null, 2));
            }}
        >
            {({ errors, touched, values, setFieldValue }) => (
                <Form id="preferences-form">
                    <DividerHeading title="General Preferences" />
                    <Availability
                        setFieldValue={setFieldValue}
                        values={values}
                        isDisabled={isDisabled}
                    />
                    <DividerHeading title="Course Preferences" mt={20} />
                    <CoursesPreferencesTable
                        values={values}
                        setFieldValue={setFieldValue}
                        isDisabled={isDisabled}
                    />
                    <DividerHeading title="Schedule Preferences" mt={20} />
                    <ScheduleAvailability
                        values={values}
                        setFieldValue={setFieldValue}
                        isDisabled={isDisabled}
                    />
                    {!isDisabled && (<Button mt={5} type="submit">
                        Submit
                    </Button>)}
                </Form>
            )}
        </Formik>
    );
};

export default PreferencesForm;
