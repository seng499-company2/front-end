import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronUpIcon,
} from "@chakra-ui/icons";
import {
    FormControl,
    Table as ChakraTable,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Flex,
    NumberInput,
    NumberInputField,
    Button,
} from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";

import TableFilter from "./TableFilter";

const Table = (props) => {
    const { columns, data, itemsPerPage, hide = false } = props;
    const [tableFilter, setTableFilter] = useState({});

    const onFilterChange = useCallback(
        (column, value) => {
            let temp = { ...tableFilter };
            temp[column.accessor] = { value: value, ...column };
            setTableFilter(temp);
        },
        [tableFilter]
    );

    const filteredData = useMemo(() => {
        if (Object.keys(tableFilter).length === 0) {
            return data;
        }
        let newData = data;

        Object.entries(tableFilter).map(([columnName, filter]) => {
            const filterObj = filter as any;
            newData = newData.filter((e) => {
                let returnValue;
                const filterVal = filterObj.value;
                if (typeof e[columnName] !== "object") {
                    if (filterObj.filter.type === "exact") {
                        //exact
                        e[columnName] === filterVal
                            ? (returnValue = true)
                            : (returnValue = false);
                    } else {
                        // default is includes filter
                        e[columnName]
                            .toLowerCase()
                            .includes(filterVal.toLowerCase())
                            ? (returnValue = true)
                            : (returnValue = false);
                    }
                } else if (typeof e[columnName] === "object") {
                    if (returnValue === false) {
                        return false;
                    }
                    // assume it's a react component
                    if (filterObj.filter.type === "exact") {
                        filterVal === e[columnName].props[filterObj.filter.key]
                            ? (returnValue = true)
                            : (returnValue = false);
                    } else {
                        // default is includes filter
                        e[columnName].props[filterObj.filter.key]
                            .toString()
                            .toLowerCase()
                            .includes(filterVal.toLowerCase())
                            ? (returnValue = true)
                            : (returnValue = false);
                    }
                }
                return returnValue;
            });
        });

        return newData;
    }, [data, tableFilter]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data: filteredData,
            initialState: { pageIndex: 0, pageSize: itemsPerPage },
        },
        useSortBy,
        usePagination
    );

    return (
        <FormControl display={hide ? "none" : null}>
            <ChakraTable {...getTableProps()}>
                <Tbody {...getTableBodyProps()}></Tbody>
            </ChakraTable>
            <ChakraTable {...getTableProps()} variant="striped">
                <Thead>
                    <Tr>
                        {columns.map((column) => (
                            <Td key={column.Header + "-filter"}>
                                {!column.disableFilterBy && (
                                    <TableFilter
                                        column={column}
                                        onFilter={onFilterChange}
                                    />
                                )}
                            </Td>
                        ))}
                    </Tr>
                    {headerGroups.map((headerGroup, i) => (
                        <Tr
                            {...headerGroup.getHeaderGroupProps()}
                            key={`${headerGroup}-${i}`}
                        >
                            {headerGroup.headers.map((column) => (
                                <Th
                                    userSelect="none"
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                    key={`${column.Header.toString()}-${i}`}
                                >
                                    <Flex alignItems="center">
                                        {column.render("Header")}
                                        {/* Add a sort direction indicator */}
                                        {column.isSorted &&
                                            (column.isSortedDesc ? (
                                                <ChevronDownIcon
                                                    ml={1}
                                                    w={4}
                                                    h={4}
                                                />
                                            ) : (
                                                <ChevronUpIcon
                                                    ml={1}
                                                    w={4}
                                                    h={4}
                                                />
                                            ))}
                                    </Flex>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {page.map((row, rowIdx) => {
                        prepareRow(row);
                        return (
                            <Tr
                                {...row.getRowProps()}
                                key={`table-row-${rowIdx}`}
                            >
                                {row.cells.map((cell, cellIdx) => {
                                    return (
                                        <Td
                                            {...cell.getCellProps()}
                                            key={`table-row-${rowIdx}-${cellIdx}`}
                                        >
                                            {cell.render("Cell")}
                                        </Td>
                                    );
                                })}
                            </Tr>
                        );
                    })}
                </Tbody>
            </ChakraTable>
            <Flex m={4} alignItems="center">
                <Button
                    variant="ghost"
                    onClick={previousPage}
                    isDisabled={!canPreviousPage}
                >
                    <ChevronLeftIcon ml={1} w={5} h={5} />
                </Button>
                <NumberInput
                    ml={2}
                    mr={8}
                    w={28}
                    min={1}
                    max={pageOptions.length}
                    onChange={(_, value) => {
                        gotoPage(value ? value - 1 : 0);
                    }}
                    defaultValue={pageIndex + 1}
                >
                    <NumberInputField />
                </NumberInput>
                / {pageOptions.length}
                <Button
                    variant="ghost"
                    onClick={nextPage}
                    isDisabled={!canNextPage}
                >
                    <ChevronRightIcon ml={1} w={5} h={5} />
                </Button>
            </Flex>
        </FormControl>
    );
};

export default Table;
