import { Select } from "@chakra-ui/react";
import C2Table from "../C2Table";

enum Willingness {
    veryWilling = 2,
    willing = 1,
    unwilling = 0,
}

enum Difficulty {
    difficult = 2,
    moderate = 1,
    easy = 0,
}

const CoursesPreferencesTable = (props) => {
    const { courses } = props;

    const columns = [
        {
            Header: "Course",
            accessor: "course",
        },
        {
            Header: "Willingness",
            accessor: "willingness",
            disableSortBy: true,
            disableFilterBy: true,
        },
        {
            Header: "Difficulty",
            accessor: "difficulty",
            disableSortBy: true,
            disableFilterBy: true,
        },
    ];

    // coursePreferences is dict with all the preferences
    // {..., "CSC 225": {willingness: 1, difficulty: 0}}
    const tableData = makeTableData(courses);

    return <C2Table columns={columns} entries={tableData} />;
};

const makeTableData = (courses) => {
    return courses.map((c) => {
        return {
            course: c,
            willingness: (
                <Select defaultValue={Willingness.willing}>
                    <option value={Willingness.unwilling}>Unwilling</option>
                    <option value={Willingness.willing}>Willing</option>
                    <option value={Willingness.veryWilling}>
                        Very Willing
                    </option>
                </Select>
            ),
            difficulty: (
                <Select defaultValue={Difficulty.moderate}>
                    <option value={Difficulty.difficult}>Difficult</option>
                    <option value={Difficulty.moderate}>Moderate</option>
                    <option value={Difficulty.easy}>Easy</option>
                </Select>
            ),
        };
    });
};

export default CoursesPreferencesTable;
