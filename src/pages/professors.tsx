import { Flex, Button } from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import { FaPlus } from "react-icons/fa";
import dynamic from "next/dynamic";

import AdminLayout from "@components/Layout/AdminLayout";
import ProfessorsSidesheet from "@components/Professors/ProfessorsSidesheet";
import AddProfessorSidesheet from "@components/Professors/AddProfessorSidesheet";

const DynamicProfessorsTableWrapper = dynamic(
    () => import("@components/Professors/ProfessorsTableWrapper"),
    { ssr: false }
);

const Professors = () => {
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
                handleSubmit={setAddIsOpen}
            />
            <DynamicProfessorsTableWrapper openDetails={openDetails} />
            <ProfessorsSidesheet
                isOpen={detailsIsOpen}
                onClose={() => setDetailsIsOpen(false)}
                professor={prof}
            />
        </Flex>
    );
};

Professors.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Professors;
