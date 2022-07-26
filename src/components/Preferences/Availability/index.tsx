import { VStack } from "@chakra-ui/react";

import CoursesPerSemester from "./CoursesPerSem";
import CourseSpread from "./CourseSpread";
import Sabbatical from "./Sabbatical";
import NonTeachingSem from "./NonTeachingSem";
import { useFormikContext } from "formik";
import { PreferencesFormType } from "src/types/preferences";

const Availability = () => {
    const { values } = useFormikContext<PreferencesFormType>();

    return (
        <VStack spacing={10} align="left">
            <NonTeachingSem />
            <CoursesPerSemester />
            <CourseSpread />
            <Sabbatical />
        </VStack>
    );
};

export default Availability;
