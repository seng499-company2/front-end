import { VStack, Button } from "@chakra-ui/react";
import { useState } from "react";

import SampleSidesheet from "../components/Sample/SampleSidesheet";
import SamplePageHeader from "../components/Sample/SamplePageHeader";
import useGetQuery from "../components/utils/useGetQuery";

const Sample = () => {
    const [open, setOpen] = useState(false);
    const { data, isLoading, isError, refetch } = useGetQuery("/users");

    const handleSubmit = (values) => {
        alert(JSON.stringify(values, null, 2));
        setOpen(false);
        refetch();
    };

    return (
        <VStack spacing={5} align="flex-start">
            <SamplePageHeader />
            <Button onClick={() => setOpen(true)}>Open Sidesheet</Button>
            <SampleSidesheet
                isOpen={open}
                onClose={() => setOpen(false)}
                handleSubmit={handleSubmit}
                data={data}
            />
        </VStack>
    );
};

export default Sample;
