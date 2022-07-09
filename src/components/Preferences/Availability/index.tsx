import { VStack } from "@chakra-ui/react";

import NumTeachingDays from "./NumTeachingDays";
import CoursesPerSemester from "./CoursesPerSem";
import PreferredDays from "./CourseSpread";
import Sabbatical from "./Sabbatical";
import NonTeachingSem from "./NonTeachingSem";

const Availability = (props) => {
    const { setFieldValue, values, isDisabled = false } = props;

    return (
        <VStack spacing={10} align="left">
            <NonTeachingSem
                setFieldValue={setFieldValue}
                value={values.nonTeachingSemester}
                isDisabled={isDisabled}
            />
            <CoursesPerSemester
                setFieldValue={setFieldValue}
                defaultValue={values.numCoursesPerSem}
                isDisabled={isDisabled}
            />
            <Sabbatical
                value={values.sabbatical.value}
                isDisabled={isDisabled}
            />
            <NumTeachingDays
                values={values.teachingDaysPerWeek}
                setFieldValue={setFieldValue}
                isDisabled={isDisabled}
            />
            <PreferredDays
                values={values.preferredDays}
                setFieldValue={setFieldValue}
                isDisabled={isDisabled}
            />
        </VStack>
    );
};

export default Availability;
