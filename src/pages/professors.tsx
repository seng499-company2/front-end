import { Flex, Button } from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import { FaPlus } from "react-icons/fa";

import AdminLayout from "../components/Layout/AdminLayout";
import ProfessorsTable from "../components/Professors/ProfessorsTable";
import ProfessorsSidesheet from "../components/Professors/ProfessorsSidesheet";
import AddProfessorSidesheet from "../components/Professors/AddProfessorSidesheet";

const Professors = ({ professors }) => {
    const [detailsIsOpen, setDetailsIsOpen] = useState(false);
    const [addIsOpen, setAddIsOpen] = useState(false);
    const [prof, setProf] = useState({});
    const openDetails = (prof) => {
        // can use prof values here (from backend)
        setDetailsIsOpen(!detailsIsOpen);
        setProf(prof);
    };

    return (
        <Flex flexDirection="column" pt="1rem">
            <Button
                ml="auto"
                leftIcon={<FaPlus />}
                onClick={() => setAddIsOpen(true)}
            >
                Add Professor
            </Button>
            <AddProfessorSidesheet
                isOpen={addIsOpen}
                onClose={() => setAddIsOpen(false)}
                //handleSubmit={handleSubmit}
            />
            <ProfessorsTable
                professors={professors}
                openDetails={openDetails}
            />
            <ProfessorsSidesheet
                isOpen={detailsIsOpen}
                onClose={() => setDetailsIsOpen(false)}
                professor={prof}
            />
        </Flex>
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
