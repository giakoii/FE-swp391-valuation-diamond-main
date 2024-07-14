import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import useAuth from "../../../utils/hook/useAuth";
import { logout } from "../../../contexts/AuthContext/reducer";

function Header() {
  const navigate = useNavigate();
  const { user, dispatch } = useAuth();
  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Navbar expand="md" className="nav-header">
      <Container fluid>
        <Navbar.Brand href="/" className="p-3 fw-bold fst-italic">
          <img
            src="https://res.cloudinary.com/dz2dv8lk4/image/upload/fl_preserve_transparency/v1719856194/logo_fyex4a.jpg?_s=public-apps"
            width="20%"
            height="20%"
            alt="Logo"
          />
          Valuation Diamond
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="me-5 fw-bold justify-content-end"
        >
          <Nav variant="underline">
           
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
          
          
              <NavDropdown title="Evaluation Service" id="nav-dropdown">
                <NavDropdown.Item as={NavLink} to="/calculate">
                  Calculate Your Diamonnd
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={NavLink} to="/evaluationservice">
                  Diamond Valuation Service
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={NavLink} to="/policy">
                  Diamond Valuation Policy
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={NavLink} to="/typevaluation">
                  Type of Valuation
                </NavDropdown.Item>
              </NavDropdown>
            
              <NavLink to="/checkdiamond" className="nav-link">
                {" "}
                Diamond Check
              </NavLink>
            
              <NavLink to="/contact" className="nav-link">
                Contact
              </NavLink>
            

            {user ? (
              <NavDropdown
                title={`${user.firstName} ${user.lastName}`}
                id="nav-dropdown"
              >
                <NavDropdown.Item as={NavLink} to="/profile">
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/my-request">
                  My Request
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={NavLink} to="/my-order">
                  My Order
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button
                className="border border-dark text-dark fw-bold"
                as={NavLink}
                to="/login"
              >
                Sign in
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
