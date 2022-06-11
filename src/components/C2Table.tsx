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
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useTable, useSortBy } from "react-table";

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

        // console.log(column, val);
    };

    const filters = getFilters(columns, onFilter);

    // TODO: Slice rows for pages
    let pageRows = rows;

    return (
        <FormControl>
            <Table {...getTableProps()}>
                <Tbody {...getTableBodyProps()}></Tbody>
            </Table>
            <Table {...getTableProps()} variant="striped">
                <Thead>
                    {headerGroups.map((headerGroup) => (
                        <Tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                // Add the sorting props to control sorting. For this example
                                // we can add them into the header props
                                <Th
                                    userSelect="none"
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
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

                    <Tr>{filters}</Tr>
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {pageRows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <Td {...cell.getCellProps()}>
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

const getFilters = (columns, onFilter) => {
    return columns.map((column) => {
        const [filterVal, setfilterVal] = useState("");

        return (
            <Td key={column.accessor+"-filter"}>
                <InputGroup>
                    <Input
                        variant="filled"
                        isDisabled={column.disableFilterBy}
                        onChange={(event) =>
                            onFilter(column.accessor, event.target.value)
                        }
                    />
                    <InputLeftElement
                        children={<Icon as={FaFilter} ml={1} w={4} h={3} />}
                    />
                </InputGroup>
            </Td>
        );
    });
};

export default C2Table;
