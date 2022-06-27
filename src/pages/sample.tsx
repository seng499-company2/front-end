import { VStack, Button } from "@chakra-ui/react";
import { useState } from "react";

import SampleSidesheet from "../components/Sample/SampleSidesheet";
import SamplePageHeader from "../components/Sample/SamplePageHeader";
import useGetQuery from "../utils/useGetQuery";
import usePostQuery from "../utils/usePostQuery";

const Sample = () => {
    const [open, setOpen] = useState(false);
    // const { data, isLoading, isError } = useGetQuery("/users");
    const {
        data: pData,
        isLoading: pLoading,
        execute,
    } = usePostQuery("/users");

    const handleSubmit = (values) => {
        execute({
            data: values,
        });
        setOpen(false);
    };

    return (
        <VStack spacing={5} align="flex-start">
            <SamplePageHeader />
            <Button onClick={() => setOpen(true)}>Open Sidesheet</Button>
            <SampleSidesheet
                isOpen={open}
                onClose={() => setOpen(false)}
                handleSubmit={handleSubmit}
            />
        </VStack>
    );
};

export default Sample;
