import { Flex, Button, CircularProgress, Center } from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import { FaPlus } from "react-icons/fa";
import AdminLayout from "@components/Layout/AdminLayout";
import dynamic from "next/dynamic";

const DynamicProfessorPage = dynamic(
    () => import("../components/Professors/ProfessorPage"),
    { ssr: false }
);

const Professors = () => {
    return <DynamicProfessorPage />;
};

Professors.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Professors;
