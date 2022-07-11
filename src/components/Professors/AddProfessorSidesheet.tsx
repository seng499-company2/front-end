import Sidesheet from "../Layout/Sidesheet";
import AddProfessorForm from "./AddProfessorForm";

export const AddProfessorSidesheet = (props) => {
    const { handleSubmit, refetch } = props;
    return (
        <Sidesheet
            size="xl"
            title="Add New Professor"
            submitLabel="Add Professor"
            formId="add-professor-form"
            {...props}
        >
            <AddProfessorForm handleSubmit={handleSubmit} refetch={refetch} />
        </Sidesheet>
    );
};

export default AddProfessorSidesheet;
