import Sidesheet from "../Layout/Sidesheet";
import CourseForm from "./CourseForm";
import { usePostQuery } from "@hooks/useRequest";
import { useToast } from "@chakra-ui/react";

export const AddCourseSidesheet = ({ isOpen, onClose, refetch }) => {
    const toast = useToast();

    const { execute, isLoading: isDataSaving } = usePostQuery(`/api/courses/`);

    const submitData = (values) => {
        execute({
            data: values,
        })
            .then((response) => {
                refetch();
                toast({
                    title: "Course Added Successfully",
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
            title="Add New Course"
            isOpen={isOpen}
            onClose={onClose}
            formId="add-course-form"
            isLoading={isDataSaving}
        >
            <CourseForm handleSubmit={submitData} formId="add-course-form" />
        </Sidesheet>
    );
};

export default AddCourseSidesheet;
