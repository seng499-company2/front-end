import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
    FormControl,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Flex,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useTable, useSortBy } from "react-table";
import TableFilter from "./TableFilter";

const C2Table = (props) => {
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

        val = val.toLowerCase();

        if (
            data[0] &&
            column in data[0] &&
            typeof data[0][column] !== "object"
        ) {
            setData(
                entries.filter((e) => e[column].toLowerCase().includes(val))
            );
            return;
        }
    };

    // TODO: Slice rows for pages
    let pageRows = rows;

    return (
        <FormControl>
            <Table {...getTableProps()}>
                <Tbody {...getTableBodyProps()}></Tbody>
            </Table>
            <Table {...getTableProps()} variant="striped">
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
                        <Tr {...headerGroup.getHeaderGroupProps()} key={i}>
                            {headerGroup.headers.map((column) => (
                                // Add the sorting props to control sorting. For this example
                                // we can add them into the header props
                                <Th
                                    userSelect="none"
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                    key={column.Header}
                                >
                                    <Flex alignItems="center">
                                        {column.render("Header")}
                                        {/* Add a sort direction indicator */}
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
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
                                            )
                                        ) : (
                                            ""
                                        )}
                                    </Flex>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                    {/*Add filters*/}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {pageRows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()} key={i}>
                                {row.cells.map((cell, i) => {
                                    return (
                                        <Td {...cell.getCellProps()} key={i}>
                                            {cell.render("Cell")}
                                        </Td>
                                    );
                                })}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </FormControl>
    );
};

export default C2Table;
