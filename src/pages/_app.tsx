import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactNode } from "react";

import theme from "../theme";
import DefaultLayout from "../components/Layout/DefaultLayout";
import { AuthProvider } from "../hooks/useAuth";

type Page<P = {}> = NextPage<P> & {
    getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
    Component: Page;
};

function App({ Component, pageProps }: Props) {
    // Use the layout defined at the page level, if available
    const getLayout =
        Component.getLayout ??
        ((page) => <DefaultLayout>{page}</DefaultLayout>);

    return (
        <ChakraProvider resetCSS theme={theme}>
            <AuthProvider>
                {getLayout(<Component {...pageProps} />)}
            </AuthProvider>
        </ChakraProvider>
    );
}

export default App;
