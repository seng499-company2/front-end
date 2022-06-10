import { Select } from "@chakra-ui/react";
import { useMemo, useState } from "react";
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

    const columns = useMemo(
        () => [
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
        ],
        []
    );

    // coursePreferences is dict with all the preferences
    // {..., "CSC 225": {willingness: 1, difficulty: 0}}
    const tableData = useMemo(() => makeTableData(courses), [courses]);

    return <C2Table columns={columns} entries={tableData} />;
};

const makeTableData = (courses) => {
    const [coursePreferences, setCoursePreferences] = useState(
        courses.reduce((obj, course) => {
            obj[course] = {
                willingness: Willingness.willing,
                difficulty: Difficulty.moderate,
            };
            return obj;
        }, {})
    );
    console.log(coursePreferences);
    return courses.map((c) => {
        // const willingnessChange = (value) => {
        //     let newcoursePreferences = { ...coursePreferences };
        //     newcoursePreferences[c] = {
        //         ...coursePreferences[c],
        //         willingness: value,
        //     };
        //     setCoursePreferences(newcoursePreferences);
        // };
        // const difficultyChange = (value) => {
        //     let newcoursePreferences = { ...coursePreferences };
        //     newcoursePreferences[c] = {
        //         ...coursePreferences[c],
        //         difficulty: value,
        //     };
        //     setCoursePreferences(newcoursePreferences);
        // };
        return {
            course: c,
            willingness: (
                <Select
                    // value={coursePreferences[c].willingness}
                    // onChange={(event) =>
                    //     willingnessChange(
                    //         Willingness[event.target.selectedOptions[0].value]
                    //     )
                    // }
                >
                    <option value={Willingness.unwilling}>Unwilling</option>
                    <option value={Willingness.willing} selected>
                        Willing
                    </option>
                    <option value={Willingness.veryWilling}>
                        Very Willing
                    </option>
                </Select>
            ),
            difficulty: (
                <Select
                    // value={coursePreferences[c].difficulty}
                    // onChange={(event) =>
                    //     difficultyChange(
                    //         Difficulty[event.target.selectedOptions[0].value]
                    //     )
                    // }
                >
                    <option value={Difficulty.difficult}>Difficult</option>
                    <option value={Difficulty.moderate} selected>
                        Moderate
                    </option>
                    <option value={Difficulty.easy}>Easy</option>
                </Select>
            ),
        };
    });
};

export default CoursesPreferencesTable;
