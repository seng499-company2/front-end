import { ChevronRightIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useMemo } from "react";
import C2Table from "../C2Table";
import { CompleteStatusBadge } from "../CompleteStatusBadge";

const ProfessorsTable = ({ professors, openDetails }) => {
    return (
        <C2Table
            columns={[
                {
                    Header: "Name",
                    accessor: "name",
                },
                {
                    Header: "Type",
                    accessor: "type",
                },
                {
                    Header: "Form Completed",
                    accessor: "status",
                    disableFilterBy: true,
                },
                {
                    Header: "",
                    accessor: "details",
                    disableSortBy: true,
                    disableFilterBy: true,
                },
            ]}
            entries={useMemo(
                () =>
                    professors.map((prof) => ({
                        name: prof.name,
                        type: prof.type,
                        status: (
                            <CompleteStatusBadge complete={prof.complete} />
                        ),
                        details: (
                            <Button
                                variant="ghost"
                                onClick={() => openDetails(prof)}
                            >
                                {" "}
                                <ChevronRightIcon ml={1} w={5} h={5} />{" "}
                            </Button>
                        ),
                    })),
                [professors, openDetails]
            )}
        />
    );
};

export default ProfessorsTable;
