import Sidesheet from "../Layout/Sidesheet";
import PreferencesForm from "../Preferences/PreferencesForm";
export const ProfessorSidesheet = ({ isOpen, onClose, professor }) => {
    return (
        <Sidesheet
            size="xl"
            title={professor.name}
            subTitle={professor.email}
            submitLabel="Submit Form"
            formId="prof-form"
            isOpen={isOpen}
            onClose={onClose}
        >
            <PreferencesForm isDisabled={true} />
        </Sidesheet>
    );
};

// export const getServerSideProps = async (id) => {
//     const professors = [
//         { id: 1, name: "Dave Dave", type: "Teaching", complete: true },
//         { id: 2, name: "Owen Wilson", type: "Research", complete: false },
//         { id: 3, name: "Gordo Ramso", type: "Research", complete: true },
//     ];

//     const prof = professors[id-1];

//     // get from api
//     // const professors = fetch(`${API_URL}/v1/professors`);

//     return {
//         props: {
//             prof
//         },
//     };
// };

export default ProfessorSidesheet;
