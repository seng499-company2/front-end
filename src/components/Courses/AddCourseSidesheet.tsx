import Sidesheet from "../Layout/Sidesheet";
import CourseForm from "./CourseForm";
import { usePostQuery } from "@hooks/useRequest";
import { useToast } from "@chakra-ui/react";

export const AddCourseSidesheet = ({ isOpen, onClose, refetch }) => {
    const toast = useToast();

    const { execute, isLoading: isDataSaving } = usePostQuery("/api/courses/");

    const onDelete = () => {};

    const submitData = async (values) => {
        await execute({
            data: values,
        })
            .then((response) => {
                refetch();
                toast({
                    title: "Course Added",
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

    const handleClose = () => {
        onClose();
    };
    return (
        <Sidesheet
            size="xl"
            title="Add New Course"
            isOpen={isOpen}
            onClose={handleClose}
            onDelete={onDelete}
            formId="edit-course-form"
            isLoading={isDataSaving}
        >
            <CourseForm handleSubmit={submitData} />
        </Sidesheet>
    );
};

export default AddCourseSidesheet;
