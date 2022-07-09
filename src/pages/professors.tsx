import { Flex, Button, CircularProgress, Center } from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useGetQuery, usePostQuery } from "@hooks/useRequest";

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
    const { data, isLoading } = useGetQuery("/api/users");

    if (isLoading)
        return (
            <Center height="50vh">
                <CircularProgress isIndeterminate />
            </Center>
        );

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
            <ProfessorsTable professors={data} openDetails={openDetails} />
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
