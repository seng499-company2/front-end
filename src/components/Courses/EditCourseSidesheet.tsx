import { useDisclosure } from "@chakra-ui/react";
import Sidesheet from "../Layout/Sidesheet";
import CourseForm from "./CourseForm";
import { useState } from "react";
import { usePostQuery, useDeleteQuery } from "@hooks/useRequest";
import { useToast } from "@chakra-ui/react";
import DeleteConfirmation from "@components/Layout/DeleteConfirmation";

export const CourseSidesheet = ({ isOpen, onClose, course, refetch }) => {
    const [isEditing, setIsEditing] = useState(false);
    const {
        isOpen: deleteOpen,
        onOpen: deleteOnOpen,
        onClose: deleteOnClose,
    } = useDisclosure();
    const toast = useToast();

    const { execute: executeEdit, isLoading: isDataSaving } = usePostQuery(
        "/api/course/" + course.course_code + "/"
    );

    const { execute: executeDelete, isLoading: isDeleteLoading } =
        useDeleteQuery("/api/course/" + course.course_code + "/");

    const onEdit = () => {
        setIsEditing(true);
    };

    const onCancel = () => {
        setIsEditing(false);
        onClose();
    };

    const onDelete = () => {
        executeDelete()
            .then((response) => {
                refetch();
                toast({
                    title: "Course Deleted",
                    status: "warning",
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
                    position: "bottom-right",
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

    return (
        <>
            <Sidesheet
                size="xl"
                title={course.course_code}
                subTitle={course.course_title}
                isOpen={isOpen}
                onClose={handleClose}
                onEdit={onEdit}
                onCancel={onCancel}
                onDelete={deleteOnOpen}
                formId="edit-course-form"
                isEditing={isEditing}
                isLoading={isDataSaving}
                isEditable
            >
                <CourseForm
                    data={course}
                    handleSubmit={submitData}
                    disabled={!isEditing}
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

export default CourseSidesheet;
