import Sidesheet from "../Layout/Sidesheet";
import CourseForm from "./CourseForm";
import { useState } from "react";

import { useGetQuery, usePostQuery, useDeleteQuery } from "@hooks/useRequest";
import { useToast, useDisclosure } from "@chakra-ui/react";
import DeleteConfirmation from "@components/Layout/DeleteConfirmation";

export const EditCourseSidesheet = ({ isOpen, onClose, course, refetch }) => {
    const [isEditing, setIsEditing] = useState(false);
    const {
        isOpen: deleteOpen,
        onOpen: deleteOnOpen,
        onClose: deleteOnClose,
    } = useDisclosure();
    const toast = useToast();

    const { data, isLoading, isError, execute } = useGetQuery(
        `/api/course/${course.course_code}/`
    );

    console.log(data);

    const { execute: executeEdit, isLoading: isDataSaving } = usePostQuery(
        `/api/course/${course.course_code}/`
    );

    const { execute: executeDelete, isLoading: isDeleteLoading } =
        useDeleteQuery(`/api/course/${course.course_code}/`);

    const onEdit = () => {
        setIsEditing(true);
    };

    const onCancel = () => {
        setIsEditing(false);
    };

    const onDelete = () => {
        executeDelete()
            .then((response) => {
                refetch();
                toast({
                    title: "Course Deleted",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left",
                });
                setIsEditing(false);
                deleteOnClose();
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

    const submitData = (values) => {
        executeEdit({
            data: values,
        })
            .then((response) => {
                refetch();
                toast({
                    title: "Course Updated",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left",
                });
                setIsEditing(false);
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
        setIsEditing(false);
    };

    const formId = "edit-course-form";

    return (
        <>
            <Sidesheet
                size="xl"
                title={course.course_code}
                subTitle={course.course_title}
                formId={formId}
                isOpen={isOpen}
                onClose={handleClose}
                onEdit={onEdit}
                onCancel={onCancel}
                onDelete={deleteOnOpen}
                isEditing={isEditing}
                isLoading={isDataSaving}
                isEditable
            >
                <CourseForm
                    handleSubmit={submitData}
                    data={course}
                    disabled={!isEditing}
                    formId={formId}
                />
            </Sidesheet>
            <DeleteConfirmation
                isOpen={deleteOpen}
                onClose={deleteOnClose}
                onDelete={onDelete}
                title={"course " + course.course_code}
                isLoading={isDeleteLoading}
            />
        </>
    );
};

export default EditCourseSidesheet;
