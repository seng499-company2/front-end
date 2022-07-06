import { Select } from "@chakra-ui/react";
import { useMemo } from "react";

import Table from "../Table";

export enum Willingness {
    veryWilling = 2,
    willing = 1,
    unwilling = 0,
}

export enum Difficulty {
    difficult = 2,
    moderate = 1,
    easy = 0,
}

const CoursesPreferencesTable = ({ values, setFieldValue, isDisabled }) => {
    const columns = [
        {
            Header: "Course",
            accessor: "course",
            filter: {
                type: "text",
            },
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

    const makeTableData = useMemo(() => {
        return Object.keys(values.coursePreferences).map((c) => {
            return {
                course: c,
                willingness: (
                    <Select
                        defaultValue={values.coursePreferences[c].willingness}
                        onChange={(v) =>
                            setFieldValue(
                                `coursePreferences.${c}.willingness`,
                                Number(v.target.selectedOptions[0].value)
                            )
                        }
                        key={c + "-willingness"}
                        isDisabled={isDisabled}
                    >
                        <option value={Willingness.unwilling}>Unwilling</option>
                        <option value={Willingness.willing}>Willing</option>
                        <option value={Willingness.veryWilling}>
                            Very Willing
                        </option>
                    </Select>
                ),
                difficulty: (
                    <Select
                        defaultValue={values.coursePreferences[c].difficulty}
                        onChange={(v) =>
                            setFieldValue(
                                `coursePreferences.${c}.difficulty`,
                                Number(v.target.selectedOptions[0].value)
                            )
                        }
                        key={c + "--difficulty"}
                        isDisabled={isDisabled}
                    >
                        <option value={Difficulty.difficult}>Difficult</option>
                        <option value={Difficulty.moderate}>Moderate</option>
                        <option value={Difficulty.easy}>Easy</option>
                    </Select>
                ),
            };
        });
    }, [setFieldValue, values?.coursePreferences, isDisabled]);

    return <Table columns={columns} entries={makeTableData} />;
};

export default CoursesPreferencesTable;
