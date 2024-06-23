// NavbarLoggedIn.jsx
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavbarLoggedUserIn = () => {
  return (
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="/">Olympe</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Accueil</Nav.Link>
          <Nav.Link href="/evenements">Événement</Nav.Link>
          <Nav.Link href="/user/profil">Profil</Nav.Link>
        </Nav>
        <Nav className="me-auto">
              <Nav.Link href="/deconnexion">Déconnexion</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
 

  );
};

export default NavbarLoggedUserIn;
