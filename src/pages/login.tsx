import { ReactElement } from "react";

import LoginLayout from "@components/Layout/LoginLayout";
import LoginCard from "@components/Login";

export const Auth = () => {
    return <LoginCard />;
};

Auth.getLayout = function getLayout(page: ReactElement) {
    return <LoginLayout>{page}</LoginLayout>;
};

export default Auth;
