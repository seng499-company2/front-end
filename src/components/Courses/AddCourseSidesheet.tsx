import Sidesheet from "../Layout/Sidesheet";
import CourseForm from "./CourseForm";

export const AddCourseSidesheet = (props) => {
    const { handleSubmit } = props;
    return (
        <Sidesheet
            size="xl"
            title="Add New Course"
            submitLabel="Create Course"
            formId="add-course-form"
            {...props}
        >
            <CourseForm handleSubmit={handleSubmit} />
        </Sidesheet>
    );
};

export default AddCourseSidesheet;
