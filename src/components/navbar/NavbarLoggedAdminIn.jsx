// NavbarLoggedIn.jsx
import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const NavbarLoggedAdminIn = () => {
  return (
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="/">Admin IN</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Accueil</Nav.Link>
          <Nav.Link href="/admin/user-list">utilisateur</Nav.Link>
          <Nav.Link href="/admin/category-list">categories</Nav.Link>
          <Nav.Link href="#link">évenements</Nav.Link>
        </Nav>
        <Nav className="me-auto">
          <Nav.Link href="deconection">Déconnection</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  
  
  );
};

export default NavbarLoggedAdminIn;
