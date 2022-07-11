import { ReactElement } from "react";
import AdminLayout from "@components/Layout/AdminLayout";
import ProfessorPage from "@components/Professors/ProfessorPage";

const Professors = () => {
    return <ProfessorPage />;
};

Professors.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Professors;
