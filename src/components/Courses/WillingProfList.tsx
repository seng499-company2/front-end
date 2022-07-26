import {
    FormLabel,
    Box,
    Tag,
    CircularProgress,
    Center,
} from "@chakra-ui/react";
import { Willingness } from "../Preferences/CoursePreferencesTable";
import { useTheme } from "@chakra-ui/system";

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
        <>
            <FormLabel as="h6" size="xs" mt={4}>
                Willing Professors:
            </FormLabel>
            <Box>
                {Object.values(data.willingProfessors).map((value, index) => {
                    return (
                        <Tag
                            mr="1"
                            mt={1}
                            colorScheme={
                                value["willingness"] === Willingness.veryWilling
                                    ? "green"
                                    : "gray"
                            }
                            key={index}
                        >
                            {value["name"]}
                        </Tag>
                    );
                })}
            </Box>
        </>
    );
};

export default WillingProfList;
