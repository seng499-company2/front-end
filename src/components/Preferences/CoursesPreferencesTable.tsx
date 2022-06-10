import { Select } from "@chakra-ui/react";
import { useMemo } from "react";
import C2Table from "../C2Table";

enum Willingness {
    veryWilling,
    willing,
    unwilling,
}

enum Difficulty {
    difficult,
    moderate,
    easy,
}

const CoursesPreferencesTable = (props) => {
    const { courses } = props;

    const columns = useMemo(
        () => [
            {
                Header: "Course",
                accessor: "course",
            },
            {
                Header: "Willingness",
                accessor: "willingness",
            },
            {
                Header: "Difficulty",
                accessor: "difficulty",
            },
        ],
        []
    );

    const tableData = useMemo(() => makeTableData(courses), [courses]);

    return <C2Table columns={columns} data={tableData} />;
};

const makeTableData = (courses) =>
    courses.map((c) => ({
        course: c,
        willingness: (
            <Select>
                <option value={Willingness.unwilling}>Unwilling</option>
                <option value={Willingness.willing} selected={true}>
                    Willing
                </option>
                <option value={Willingness.veryWilling}>Very Willing</option>
            </Select>
        ),
        difficulty: (
            <Select>
                <option value={Difficulty.difficult}>Difficult</option>
                <option value={Difficulty.moderate} selected={true}>
                    Moderate
                </option>
                <option value={Difficulty.easy}>Easy</option>
            </Select>
        ),
    }));

export default CoursesPreferencesTable;
