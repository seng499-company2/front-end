import { ChevronRightIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useMemo } from "react";

import Table from "../Table";
import { CompleteStatusBadge } from "../CompleteStatusBadge";

const ProfessorsTable = ({ professors, openDetails }) => {
    return (
        <Table
            columns={[
                {
                    Header: "Name",
                    accessor: "name",
                    filter: {
                        type: "text",
                    },
                },
                {
                    Header: "Type",
                    accessor: "type",
                    filter: {
                        type: "dropdown",
                        options: [
                            { label: "Teaching", value: "Teaching" },
                            { label: "Research", value: "Research" },
                        ],
                    },
                },
                {
                    Header: "Form Completed",
                    accessor: "status",
                    filter: {
                        type: "dropdown",
                        options: [
                            { label: "Complete", value: true },
                            { label: "Incomplete", value: false },
                        ],
                        key: "complete", // prop to filter by
                        filterType: "exact",
                    },
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
                                <ChevronRightIcon ml={1} w={5} h={5} />
                            </Button>
                        ),
                    })),
                [professors, openDetails]
            )}
        />
    );
};

export default ProfessorsTable;
