import NavBar from "./NavBar";

import Container from "../Container";

const AdminLayout = ({ children }) => (
  <NavBar>
    <Container height="100%" m={5}>
      {children}
    </Container>
  </NavBar>
);

export default AdminLayout;
