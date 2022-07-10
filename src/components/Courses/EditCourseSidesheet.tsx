import { VStack, Text, Box, Divider } from "@chakra-ui/react";
import Sidesheet from "../Layout/Sidesheet";
import CourseForm from "./CourseForm";
import { useState } from "react";
import { usePostQuery } from "@hooks/useRequest";

export const CourseSidesheet = ({ isOpen, onClose, course }) => {
    const [isEditing, setIsEditing] = useState(false);

    const {
        data: saveData,
        execute,
        isError: isSaveError,
        isLoading: isDataSaving,
    } = usePostQuery("/api/course/" + course.course_code + "/");

    const onEdit = () => {
        setIsEditing(true);
    };

    const onCancel = () => {
        setIsEditing(false);
        onClose();
    };

    const onDelete = () => {};

    const submitData = (values) => {
        execute({
            data: values,
        });
        setIsEditing(false);
    };

    return (
        <Sidesheet
            size="xl"
            title={course.course_code}
            subTitle={course.course_title}
            isOpen={isOpen}
            onClose={onClose}
            onEdit={onEdit}
            onCancel={onCancel}
            onDelete={onDelete}
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
    );
};

export default CourseSidesheet;
