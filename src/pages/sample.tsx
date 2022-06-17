import { VStack, Button } from "@chakra-ui/react";
import { useState } from "react";

import SampleSidesheet from "../components/Sample/SampleSidesheet";
import SamplePageHeader from "../components/Sample/SamplePageHeader";

import { useSWRConfig } from "swr";

const Sample = () => {
    const { mutate } = useSWRConfig();
    const [open, setOpen] = useState(false);

    const handleSubmit = (values) => {
        alert(JSON.stringify(values, null, 2));
        mutate("/users"); //refetches data when we know it has changed ie: post request
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
