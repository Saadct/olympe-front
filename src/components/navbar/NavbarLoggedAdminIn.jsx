// NavbarLoggedIn.jsx
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavbarLoggedAdminIn = () => {
  return (
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="/">Olympe <span style={{fontSize:"11px"}}>administrateur</span></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="light">
        <Nav className="me-auto">
          <Nav.Link href="/">Accueil</Nav.Link>
          <Nav.Link href="/admin/user-list">Utilisateurs</Nav.Link>
          <Nav.Link href="/admin/category-list">Categories</Nav.Link>
          <Nav.Link href="/admin/event-list">Événements</Nav.Link>
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

export default NavbarLoggedAdminIn;
