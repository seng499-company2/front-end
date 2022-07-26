import { VStack } from "@chakra-ui/react";

import CoursesPerSemester from "./CoursesPerSem";
import CourseSpread from "./CourseSpread";
import Sabbatical from "./Sabbatical";
import NonTeachingSem from "./NonTeachingSem";

const Availability = () => {
    return (
        <VStack spacing={10} align="left">
            <Sabbatical />
            <NonTeachingSem />
            <CoursesPerSemester />
            <CourseSpread />
        </VStack>
    );
};

export default Availability;
