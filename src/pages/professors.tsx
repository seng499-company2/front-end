import {
    Box,
} from "@chakra-ui/react";
import { ReactElement, useState } from "react";

import AdminLayout from "../components/Layout/AdminLayout";
import ProfessorsTable from "../components/Professors/ProfessorsTable";
import SampleSidesheet from "../components/Sample/SampleSidesheet";

const Professors = ({ professors }) => {
    const [open, setOpen] = useState(false);

    const openDetails = (prof) => {
        // can use prof values here (from backend)
        setOpen(!open);
    }

    const handleSubmit = (values) => {
        alert(JSON.stringify(values, null, 2));
        setOpen(false);
    };

    return (
        <Box pt="1rem">
            <ProfessorsTable professors={professors} openDetails={openDetails}/>
            <SampleSidesheet
                isOpen={open}
                onClose={() => setOpen(false)}
                handleSubmit={handleSubmit}
            />
        </Box>
    );
};

export const getServerSideProps = async () => {
    const professors = [
        { id: 1, name: "Dave Dave", type: "Teaching", complete: true },
        { id: 2, name: "Owen Wilson", type: "Research", complete: false },
        { id: 3, name: "Gordo Ramso", type: "Research", complete: true },
    ];

    // get from api
    // const professors = fetch(`${API_URL}/v1/professors`);

    return {
        props: {
            professors,
        },
    };
};

Professors.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Professors;
