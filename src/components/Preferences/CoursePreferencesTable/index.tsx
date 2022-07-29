import { Select } from "@chakra-ui/react";
import { useMemo } from "react";

import Table from "@components/Table";
import CoursePrefNameCell from "./CoursePrefNameCell";
import useProfPrefMeta from "@hooks/useProfPrefMeta";
import { useFormikContext } from "formik";
import { PreferencesFormType } from "src/types/preferences";

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

const WillingnessSort = (rowA, rowB) => {
    const valA = rowA.values.willingness.props.value;
    const valB = rowB.values.willingness.props.value;
    return valA > valB ? 1 : -1;
};

const DifficultySort = (rowA, rowB) => {
    const valA = rowA.values.difficulty.props.value;
    const valB = rowB.values.difficulty.props.value;
    return valA > valB ? 1 : -1;
};

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
        filter: {
            type: "dropdown",
            options: [
                { label: "Very Willing", value: Willingness.veryWilling },
                { label: "Willing", value: Willingness.willing },
                { label: "Unwilling", value: Willingness.unWilling },
                { label: "Not Qualified", value: Willingness.notQualified },
            ],
            key: "value", // prop to filter by
        },
        sortType: WillingnessSort,
    },
    {
        Header: "Difficulty",
        accessor: "difficulty",
        filter: {
            type: "dropdown",
            options: [
                { label: "With Effort", value: Difficulty.withEffort },
                { label: "Able", value: Difficulty.able },
                { label: "Not Qualified", value: Difficulty.notQualified },
            ],
            key: "value", // prop to filter by
        },
        sortType: DifficultySort,
    },
];

const CoursesPreferencesTable = () => {
    const {
        values: { coursePreferences },
        setFieldValue,
    } = useFormikContext<PreferencesFormType>();
    const { profType, isDisabled } = useProfPrefMeta();

    const makeTableData = useMemo(() => {
        return Object.keys(coursePreferences).map((c) => {
            return {
                course: <CoursePrefNameCell name={c} />,
                willingness: (
                    <Select
                        value={coursePreferences[c].willingness}
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
                        value={coursePreferences[c].difficulty}
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
    }, [setFieldValue, coursePreferences, isDisabled]);

    return <Table columns={columns} data={makeTableData} itemsPerPage={10} />;
};

export default CoursesPreferencesTable;
