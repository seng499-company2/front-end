import { useCallback, useMemo, useState } from "react";

type FilterType = "exact" | "includes" | "text" | "dropdown";

interface CalendarFilter {
    [key: string]: {
        value: string;
        filter: {
            type: FilterType;
        };
    };
}

const useCalendarFilter = (data) => {
    const [calendarFilter, setCalendarFilter] = useState<CalendarFilter>();

    const onFilterChange = useCallback((column, value) => {
        setCalendarFilter((prevCalendarFilter) => {
            const { [column.accessor]: prevFilter, ...rest } =
                prevCalendarFilter || {};
            if (!value) {
                return rest;
            }
            return {
                ...rest,
                [column.accessor]: { value, filter: column.filter },
            };
        });
    }, []);

    const filteredData = useMemo(() => {
        if (!calendarFilter || Object.keys(calendarFilter).length === 0) {
            return data;
        }
        const newData = {
            fall: [...data.fall],
            spring: [...data.spring],
            summer: [...data.summer],
        };

        Object.entries(calendarFilter).map(([columnName, filter]) => {
            const filterObj = filter;
            Object.keys(data).forEach((semester) => {
                newData[semester] = newData[semester].filter((e) => {
                    const eF = {
                        course: e.details.course.code,
                        professor: e.details.section.professor.name,
                        yearRequired: e.details.course.yearRequired,
                        pengRequired: e.details.course.pengRequired,
                    };
                    const filterVal = filterObj.value;
                    if (filterObj.filter.type === "dropdown") {
                        return filterVal === eF[columnName];
                    } else {
                        // default is includes filter
                        return eF[columnName]
                            .toLowerCase()
                            .includes(filterVal.toLowerCase());
                    }
                });
            });
        });

        return newData;
    }, [data, calendarFilter]);

    return { filteredData, onFilterChange };
};

export default useCalendarFilter;
