import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";

import theme from "../theme";
import Layout from "../components/Layout/Layout";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default App;
