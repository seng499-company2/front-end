import Sidesheet from "../Layout/Sidesheet";
import AddCourseForm from "./AddProfessorForm";
import AddProfessorForm from "./AddProfessorForm";

export const AddProfessorSidesheet = (props) => {
    const { handleSubmit } = props;
    return (
        <Sidesheet
            size="xl"
            title="Add New Professor"
            submitLabel="Add Professor"
            formId="add-professor-form"
            {...props}
        >
            <AddProfessorForm handleSubmit={handleSubmit} />
        </Sidesheet>
    );
};

export default AddProfessorSidesheet;
