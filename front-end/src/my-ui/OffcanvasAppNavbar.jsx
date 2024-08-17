import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Container, NavDropdown, Offcanvas, Form, Button, Table } from 'react-bootstrap';
import img from './sword_5522602.png'


const expand = 'md';

const OffcanvasAppNavbar = () => {


  const numbers = n => Array.from({ length: n }, (_, index) => index + 1);

  return (
    <Navbar collapseOnSelect key={expand} expand={expand} className="bg-body-tertiary mb-3 shadow-lg">
      <Container>
        <Navbar.Brand href="#">
          <img
            alt=""
            src={img}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Sujith Manchala

        </Navbar.Brand>
        <Navbar.Toggle checked={true} style={{ 'box-shadow': 'none' }} />
        <Navbar.Offcanvas
          onHide={() => console.info('Clicking close button')}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">

              {
                numbers(10).map(e => <Nav.Link href="#action1">Home</Nav.Link>)
              }
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>

    
  );
};

export default OffcanvasAppNavbar;
