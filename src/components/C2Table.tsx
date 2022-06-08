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
} from "@chakra-ui/react";
import { useTable, useSortBy } from "react-table";

const C2Table = (props) => {
    const { columns, data } = props;
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable(
            {
                columns,
                data,
            },
            useSortBy
        );

    // TODO: Slice rows for pages
    let pageRows = rows;

    return (
        <FormControl>
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

export default C2Table;
