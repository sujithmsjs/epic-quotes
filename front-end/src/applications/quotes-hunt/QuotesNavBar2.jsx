import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import img from '../../resources/images/book.png'
import { NavLink, Outlet } from 'react-router-dom';



const QuotesNavBar2 = ({ imp = null }) => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={img}
              width="30"
              height="30"
              className="d-inline-block align-top"  
            />{' '}
            Quotes
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ 'box-shadow': 'none' }} />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink className="nav-link active" to="" end>Home</NavLink>
              <NavLink className="nav-link active" to="home" end>List</NavLink>
              <NavLink className="nav-link" to="add" >New</NavLink> 
              <NavLink className="nav-link" to="add-tag">Add Objects</NavLink>
              <NavLink className="nav-link" to="proverbs">Proverbs</NavLink>
              <NavLink className="nav-link" to="import">Import</NavLink>
              <NavLink className="nav-link" to="search-test">Search Test</NavLink>  
              <NavLink className="nav-link" to="metrics">Metrics</NavLink>
              <NavLink className="nav-link" to="listv3">List V3</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default QuotesNavBar2;