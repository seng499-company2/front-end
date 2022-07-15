import Sidesheet from "../Layout/Sidesheet";
import AddProfessorForm from "./AddProfessorForm";
import { useToast } from "@chakra-ui/react";
import { usePostQuery } from "@hooks/useRequest";

export const AddProfessorSidesheet = ({ isOpen, onClose, refetch }) => {
    const toast = useToast();

    const { execute, isLoading: isDataSaving } = usePostQuery(`/api/users/`);

    const submitData = (values) => {
        execute({
            data: values,
        })
            .then((response) => {
                refetch();
                toast({
                    title: "Professor Added Successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left",
                });
                onClose();
            })
            .catch((error) => {
                toast({
                    title: "Error: " + error.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                    position: "bottom-left",
                });
            });
    };

    return (
        <Sidesheet
            size="xl"
            title="Add New Professor"
            isOpen={isOpen}
            onClose={onClose}
            formId="add-professor-form"
            isLoading={isDataSaving}
        >
            <AddProfessorForm handleSubmit={submitData} />
        </Sidesheet>
    );
};

export default AddProfessorSidesheet;
