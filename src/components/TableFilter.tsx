import {
    InputGroup,
    Input,
    InputLeftElement,
    Icon,
    Select,
} from "@chakra-ui/react";
import { FaFilter } from "react-icons/fa";

export const TableFilter = ({ column, onFilter }) => {
    return (
        <>
            {column.filter.type === "text" ? (
                <InputGroup>
                    <Input
                        variant="filled"
                        placeholder={column.Header}
                        onChange={(event) =>
                            onFilter(column.accessor, event.target.value)
                        }
                    />
                    <InputLeftElement>
                        <Icon as={FaFilter} ml={1} w={4} h={3} />
                    </InputLeftElement>
                </InputGroup>
            ) : (
                <Select
                    variant="filled"
                    placeholder={`${column.Header}`}
                    onChange={(event) =>
                        onFilter(column.accessor, event.target.value)
                    }
                >
                    {column.filter.options.map((option: string) => (
                        <option key={option}>{option}</option>
                    ))}
                </Select>
            )}
        </>
    );
};

export default TableFilter;
