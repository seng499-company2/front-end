import {
    InputGroup,
    Input,
    InputLeftElement,
    Icon,
    Select,
} from "@chakra-ui/react";
import { FaFilter } from "react-icons/fa";

export const TableFilter = ({ column, onFilter }) => {
    const placeholder = column.Header;

    const onChange = (e) => {
        onFilter(column, e.target.value);
    };

    return (
        <>
            {column.filter.type === "text" ? (
                <InputGroup>
                    <Input
                        variant="filled"
                        placeholder={placeholder}
                        onChange={onChange}
                    />
                    <InputLeftElement>
                        <Icon as={FaFilter} ml={1} w={4} h={3} />
                    </InputLeftElement>
                </InputGroup>
            ) : (
                <Select
                    variant="filled"
                    placeholder={placeholder}
                    onChange={onChange}
                >
                    {column.filter.options.map(({ label, value }) => (
                        <option
                            key={`${column.Header}-filter-${label}`}
                            value={value}
                        >
                            {label}
                        </option>
                    ))}
                </Select>
            )}
        </>
    );
};

export default TableFilter;
