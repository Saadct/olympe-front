// NavbarLoggedIn.jsx
import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const NavbarLoggedUserIn = () => {
  return (
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="/">Olympe User in</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Accueil</Nav.Link>
          <Nav.Link href="/evenements">Evenements</Nav.Link>
          <Nav.Link href="/user/profil">profil</Nav.Link>
        </Nav>
        <Nav className="me-auto">
              <Nav.Link href="/deconection">deconection</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
 

  );
};

export default NavbarLoggedUserIn;
