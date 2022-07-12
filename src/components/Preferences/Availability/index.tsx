import { VStack } from "@chakra-ui/react";

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
                value={{
                    numCoursesPerSem: values.numCoursesPerSem,
                    nonTeachingSemester: values.nonTeachingSemester,
                }}
                isDisabled={isDisabled}
            />
            <PreferredDays
                values={values.preferredDays}
                setFieldValue={setFieldValue}
                isDisabled={isDisabled}
            />
            <Sabbatical values={values.sabbatical} isDisabled={isDisabled} />
        </VStack>
    );
};

export default Availability;
