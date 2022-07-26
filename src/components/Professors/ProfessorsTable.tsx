import { ChevronRightIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useMemo } from "react";

import Table from "../Table";
import { CompleteStatusBadge } from "../CompleteStatusBadge";

const CompleteSort = (rowA, rowB) => {
    const valA = rowA.values.status.props.complete;
    const valB = rowB.values.status.props.complete;
    return valA > valB ? 1 : -1;
};

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
                    sortType: CompleteSort,
                },
                {
                    Header: "PEng",
                    accessor: "is_peng",
                    filter: {
                        type: "dropdown",
                        options: [
                            { label: "Yes", value: "Yes" },
                            { label: "No", value: " " },
                        ],
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
            data={useMemo(
                () =>
                    professors?.map((prof) => {
                        const {
                            is_peng: isPeng,
                            prof_type: profType,
                            is_form_submitted: complete,
                            user: {
                                first_name: firstName,
                                last_name: lastName,
                                is_superuser: isAdmin,
                                email,
                                username,
                            },
                        } = prof;

                        const type =
                            profType === "TP" ? "Teaching" : "Research";

                        const profDetails = {
                            isPeng,
                            type: profType,
                            complete,
                            firstName,
                            lastName,
                            isAdmin,
                            email,
                            username,
                        };

                        return {
                            name: `${firstName} ${lastName}`,
                            type: type,
                            status: <CompleteStatusBadge complete={complete} />,
                            is_peng: isPeng ? "Yes" : " ",
                            details: (
                                <Button
                                    variant="ghost"
                                    onClick={() => openDetails(profDetails)}
                                >
                                    <ChevronRightIcon ml={1} w={5} h={5} />
                                </Button>
                            ),
                        };
                    }),
                [professors, openDetails]
            )}
            itemsPerPage={25}
        />
    );
};

export default ProfessorsTable;
