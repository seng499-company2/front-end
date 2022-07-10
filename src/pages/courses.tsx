import { ReactElement } from "react";
import dynamic from "next/dynamic";
import AdminLayout from "../components/Layout/AdminLayout";

const DynamicCoursePage = dynamic(
    () => import("../components/Courses/CoursePage"),
    { ssr: false }
);

const Courses = () => {
    return <DynamicCoursePage />;
};

Courses.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Courses;
