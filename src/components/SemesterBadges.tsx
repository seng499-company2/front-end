import { Tag } from "@chakra-ui/react";

export const SemesterBadges = ({ semesters, useColor = true, ...other }) => {
    const colors = {
        fall: useColor ? "blue" : "gray",
        spring: useColor ? "orange" : "gray",
        summer: useColor ? "pink" : "gray",
    };
    return semesters.map((semester) => {
        return (
            <Tag colorScheme={colors[semester]} mr={1} key={semester}>
                {semester}
            </Tag>
        );
    });
};
