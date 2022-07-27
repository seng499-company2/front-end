import {
    FormLabel,
    Box,
    Tag,
    CircularProgress,
    Center,
    Tooltip,
    Heading,
} from "@chakra-ui/react";
import { Willingness } from "../Preferences/CoursePreferencesTable";
import { useTheme } from "@chakra-ui/system";
import { formatWillingness } from "@lib/format";

const WillingProfList = ({ data, isLoading }) => {
    const {
        colors: { primary },
    } = useTheme();
    if (!isLoading && !data) return null;
    if (isLoading)
        return (
            <>
                <FormLabel as="h6" size="xs" mt={4}>
                    Willing Professors:
                </FormLabel>
                <Center>
                    <CircularProgress color={primary[400]} isIndeterminate />
                </Center>
            </>
        );

    if (Object.values(data.willingProfessors).length === 0)
        return (
            <>
                <FormLabel as="h6" size="xs" mt={4}>
                    Willing Professors:
                </FormLabel>
                No professor is willing to teach this course yet
            </>
        );

    return (
        <Box my={8}>
            <FormLabel mb={4}>
                <Heading size="sm">Willing Professors</Heading>
            </FormLabel>
            <Box>
                {Object.values(data.willingProfessors)
                    .sort((a: any, b: any) =>
                        a.willingness < b.willingness ? 1 : -1
                    )
                    .map((value: any, index) => {
                        return (
                            <Tooltip
                                key={index}
                                placement="top"
                                label={formatWillingness(value.willingness)}
                            >
                                <Tag
                                    mr="1"
                                    mt={1}
                                    size="lg"
                                    colorScheme={
                                        value.willingness ===
                                        Willingness.veryWilling
                                            ? "green"
                                            : "gray"
                                    }
                                >
                                    {value.name ?? "Unknown"}
                                </Tag>
                            </Tooltip>
                        );
                    })}
            </Box>
        </Box>
    );
};

export default WillingProfList;
