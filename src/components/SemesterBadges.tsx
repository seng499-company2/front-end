import { Tag } from "@chakra-ui/react";

export const SemesterBadges = ({ semesters, ...other }) => {
    const colors = {
        Fall: "blue",
        Spring: "orange",
        Summer: "pink",
    }
    return (
        semesters.map((semester) => (
            <Tag colorScheme={colors[semester]} mr={1}>{semester}</Tag>
        ))
    );
};