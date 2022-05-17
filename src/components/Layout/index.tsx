import Header from "./Header";
import Footer from "./Footer";
import Container from "../Container";

const Layout = ({ children }) => (
  <>
    <Header />
    <Container height="100vh">{children}</Container>
    <Footer />
  </>
);

export default Layout;
