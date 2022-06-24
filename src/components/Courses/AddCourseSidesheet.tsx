import Sidesheet from "../Layout/Sidesheet";
//import SampleForm from "./SampleForm";
import AddCourseForm from "./AddCourseForm";

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
            <AddCourseForm handleSubmit={handleSubmit} />
        </Sidesheet>
    );
};

export default AddCourseSidesheet;
