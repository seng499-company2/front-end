import { Box } from "@chakra-ui/react";
import { ReactElement, useState } from "react";

import AdminLayout from "../components/Layout/AdminLayout";
import ProfessorsTable from "../components/Professors/ProfessorsTable";
import ProfessorsSidesheet from "../components/Professors/ProfessorsSidesheet";

const Professors = ({ professors }) => {
    const [open, setOpen] = useState(false);
    const [prof, setProf] = useState({});
    const openDetails = (prof) => {
        // can use prof values here (from backend)
        setOpen(!open);
        setProf(prof);
    };

    return (
        <Box pt="1rem">
            <ProfessorsTable
                professors={professors}
                openDetails={openDetails}
            />
            <ProfessorsSidesheet
                isOpen={open}
                onClose={() => setOpen(false)}
                professor={prof}
            />
        </Box>
    );
};

export const getServerSideProps = async () => {
    const professors = [
        {
            id: 1,
            name: "Dave Dave",
            type: "Teaching",
            complete: true,
            email: "dave@dave.ca",
        },
        {
            id: 2,
            name: "Owen Wilson",
            type: "Research",
            complete: false,
            email: "owenwilson@wow.com",
        },
        {
            id: 3,
            name: "Gordo Ramso",
            type: "Research",
            complete: true,
            email: "gr@hellsnightmare.uk",
        },
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
