import Sidesheet from "../Layout/Sidesheet";
import PreferencesForm from "../Preferences/PreferencesForm";

export const ProfessorSidesheet = ({ isOpen, onClose, professor }) => {
    const initialValues = {
        //mock data
        numCoursesPerSem: {
            fall: 0,
            spring: 3,
            summer: 2,
        },
        // relief: {
        //     value: false,
        //     numCourses: 0,
        // },
        sabbatical: {
            value: true,
            duration: "half",
            fromMonth: "january",
        },
        teachingDaysPerWeek: {
            value: 2,
        },
        preferredDays: {
            monday: true,
            tuesday: false,
            wednesday: true,
            thursday: true,
            friday: false,
        },
        preferredTime: {
            fall: [
                {
                    day: 1,
                    time: 8,
                },
                {
                    day: 1,
                    time: 9,
                },
                {
                    day: 1,
                    time: 10,
                },
                {
                    day: 1,
                    time: 11,
                },
                {
                    day: 1,
                    time: 12,
                },
                {
                    day: 4,
                    time: 8,
                },
                {
                    day: 4,
                    time: 9,
                },
                {
                    day: 4,
                    time: 10,
                },
                {
                    day: 4,
                    time: 11,
                },
                {
                    day: 4,
                    time: 12,
                },
            ],
            summer: [
                {
                    day: 1,
                    time: 12,
                },
                {
                    day: 1,
                    time: 13,
                },
                {
                    day: 1,
                    time: 14,
                },
                {
                    day: 1,
                    time: 15,
                },
                {
                    day: 1,
                    time: 16,
                },
                {
                    day: 4,
                    time: 12,
                },
                {
                    day: 4,
                    time: 13,
                },
                {
                    day: 4,
                    time: 14,
                },
                {
                    day: 4,
                    time: 15,
                },
                {
                    day: 4,
                    time: 16,
                },
            ],
            spring: [],
        },
        coursePreferences: {
            "CSC 225": {
                willingness: 1,
                difficulty: 2,
            },
            "CSC 226": {
                willingness: 0,
                difficulty: 0,
            },
            "ECE 260": {
                willingness: 2,
                difficulty: 2,
            },
            "ECE 310": {
                willingness: 1,
                difficulty: 0,
            },
            "SENG 265": {
                willingness: 0,
                difficulty: 1,
            },
            "SENG 310": {
                willingness: 1,
                difficulty: 2,
            },
        },
    };
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
            <PreferencesForm isDisabled={true} initialValues={initialValues} />
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
