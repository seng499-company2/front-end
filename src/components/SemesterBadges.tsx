import { Tag } from "@chakra-ui/react";

export const getSemesterColor = (semester, useColor = true) => {
    return {
        fall: useColor ? "blue" : "gray",
        spring: useColor ? "orange" : "gray",
        summer: useColor ? "pink" : "gray",
    }[semester];
};

export const SemesterBadges = ({
    semesters,
    useColor = true,
    semesterString = "",
    ...other
}) => {
    return semesters.map((semester) => {
        return (
            <Tag
                colorScheme={getSemesterColor(semester, useColor)}
                mr={1}
                key={semester}
                {...other}
            >
                {semester}
            </Tag>
        );
    });
};
