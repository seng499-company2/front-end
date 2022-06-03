import Header from "./Header";
import Footer from "./Footer";
import Container from "../Container";
import { Flex } from "@chakra-ui/react";

const Layout = ({ children }) => (
  <Flex direction="column" height="100vh" bg="background.main">
    <Header />
    <Container height='100%' m={5} >{children}</Container>
    <Footer />
  </Flex>
);

export default Layout;
