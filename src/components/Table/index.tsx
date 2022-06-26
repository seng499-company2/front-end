import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
    FormControl,
    Table as ChakraTable,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTable, useSortBy } from "react-table";

import TableFilter from "./TableFilter";

const Table = (props) => {
    const { columns, entries } = props;

    const [data, setData] = useState(entries);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable(
            {
                columns,
                data,
            },
            useSortBy
        );

    const onFilter = (column, val) => {
        if (!val) {
            setData(entries);
            return;
        }

        const { accessor, filter } = column;

        // process the filter value

        val = val.toLowerCase();

        if (["true", "false"].includes(val)) {
            // convert to boolean
            val = val === "true";
        }
        if (data.length == 0) {
            return;
        }

        if (
            data[0] &&
            accessor in data[0] &&
            typeof data[0][accessor] !== "object"
        ) {
            if (filter.filterType === "exact") {
                setData(entries.filter((e) => e[accessor] === val));
            } else {
                // default is includes filter
                setData(
                    entries.filter((e) =>
                        e[accessor].toLowerCase().includes(val)
                    )
                );
            }
        } else if (typeof data[0][accessor] === "object") {
            // assume it's a react component
            if (filter.filterType === "exact") {
                setData(
                    entries.filter((e) => e[accessor].props[filter.key] === val)
                );
            } else {
                // default is includes filter
                setData(
                    entries.filter((e) =>
                        e[accessor].props[filter.key]
                            .toLowerCase()
                            .includes(val)
                    )
                );
            }
        }
    };

    // TODO: Slice rows for pages
    let pageRows = rows;

    return (
        <FormControl>
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
                                        onFilter={onFilter}
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
                                // Add the sorting props to control sorting. For this example
                                // we can add them into the header props
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
                    {pageRows.map((row, rowIdx) => {
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
        </FormControl>
    );
};

export default Table;
