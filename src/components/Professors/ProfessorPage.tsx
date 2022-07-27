import { Flex, Button } from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import ProfessorsSidesheet from "@components/Professors/ProfessorsSidesheet";
import AddProfessorSidesheet from "@components/Professors/AddProfessorSidesheet";
import { useGetQuery } from "@hooks/useRequest";
import ProfessorsTableWrapper from "@components/Professors/ProfessorsTableWrapper";

const ProfessorPage = () => {
    const [detailsIsOpen, setDetailsIsOpen] = useState(false);
    const [addIsOpen, setAddIsOpen] = useState(false);
    const [prof, setProf] = useState({});

    const { data, isLoading, isError, execute } = useGetQuery(`/api/users`, {
        useCache: false,
    });

    const openDetails = (prof) => {
        setDetailsIsOpen(true);
        setProf(prof);
    };

    return (
        <Flex flexDirection="column" pt="1rem">
            {!isLoading && (
                <Button
                    ml="auto"
                    leftIcon={<FaPlus />}
                    onClick={() => setAddIsOpen(true)}
                >
                    Add Professor
                </Button>
            )}
            <AddProfessorSidesheet
                isOpen={addIsOpen}
                onClose={() => setAddIsOpen(false)}
                refetch={execute}
            />
            <ProfessorsTableWrapper
                openDetails={openDetails}
                data={data}
                execute={execute}
                isLoading={isLoading}
                isError={isError}
            />
            <ProfessorsSidesheet
                isOpen={detailsIsOpen}
                onClose={() => setDetailsIsOpen(false)}
                professor={prof}
                refetch={execute}
            />
        </Flex>
    );
};

export default ProfessorPage;
