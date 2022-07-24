import { Select } from "@chakra-ui/react";
import { useMemo } from "react";

import Table from "@components/Table";
import CoursePrefNameCell from "./CoursePrefNameCell";

export enum Willingness {
    veryWilling = 3,
    willing = 2,
    unWilling = 1,
    notQualified = 0,
}

export enum Difficulty {
    withEffort = 2,
    able = 1,
    notQualified = 0,
}

const columns = [
    {
        Header: "Course",
        accessor: "course",
        filter: {
            type: "text",
            key: "name", // prop to filter by
        },
    },
    {
        Header: "Willingness",
        accessor: "willingness",
        disableFilterBy: true,
    },
    {
        Header: "Difficulty",
        accessor: "difficulty",
        disableFilterBy: true,
    },
];

const CoursesPreferencesTable = ({ values, setFieldValue, isDisabled }) => {
    const makeTableData = useMemo(() => {
        return Object.keys(values).map((c) => {
            return {
                course: <CoursePrefNameCell name={c} />,
                willingness: (
                    <Select
                        value={values[c].willingness}
                        onChange={(v) =>
                            setFieldValue(
                                `coursePreferences.${c}.willingness`,
                                Number(v.target.selectedOptions[0].value)
                            )
                        }
                        key={c + "-willingness"}
                        isDisabled={isDisabled}
                    >
                        <option value={Difficulty.notQualified}>
                            Not Quailified
                        </option>
                        <option value={Willingness.unWilling}>Unwilling</option>
                        <option value={Willingness.willing}>Willing</option>
                        <option value={Willingness.veryWilling}>
                            Very Willing
                        </option>
                    </Select>
                ),
                difficulty: (
                    <Select
                        value={values[c].difficulty}
                        onChange={(v) =>
                            setFieldValue(
                                `coursePreferences.${c}.difficulty`,
                                Number(v.target.selectedOptions[0].value)
                            )
                        }
                        key={c + "--difficulty"}
                        isDisabled={isDisabled}
                    >
                        <option value={Difficulty.notQualified}>
                            Not Quailified
                        </option>
                        <option value={Difficulty.withEffort}>
                            With Effort
                        </option>
                        <option value={Difficulty.able}>Able</option>
                    </Select>
                ),
            };
        });
    }, [setFieldValue, values, isDisabled]);

    return <Table columns={columns} data={makeTableData} />;
};

export default CoursesPreferencesTable;
