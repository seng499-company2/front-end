import { Button, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import Availability from "./Availability";
import CoursesPreferencesTable from "./CoursePreferencesTable";
import ScheduleAvailability from "./ScheduleAvailability";
import DividerHeading from "../DividerHeading";
import { ProfPrefMetaProvider } from "@hooks/useProfPrefMeta";
import { PreferencesFormType } from "src/types/preferences";

const PreferencesForm = (props) => {
    const {
        isDisabled,
        isProfessorPage = false,
        initialValues,
        handleSubmit,
        isError,
        isLoading = false,
        profType,
    } = props;

    return (
        <ProfPrefMetaProvider value={{ profType, isDisabled }}>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues as PreferencesFormType}
                validateOnChange={false}
                onSubmit={(values) => {
                    handleSubmit(values);
                }}
            >
                <Form id="preferences-form">
                    <DividerHeading title="General Preferences" />
                    <Availability />
                    <DividerHeading title="Course Preferences" mt={20} />
                    <CoursesPreferencesTable />
                    <DividerHeading title="Schedule Preferences" mt={20} />
                    <ScheduleAvailability />
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
            </Formik>
        </ProfPrefMetaProvider>
    );
};

export default PreferencesForm;
