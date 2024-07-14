import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import useAuth from "../../../utils/hook/useAuth";
import { logout } from "../../../contexts/AuthContext/reducer";
import { FaSignInAlt } from "react-icons/fa";

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
          VALUATION DIAMOND
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="me-5 fw-bold justify-content-end"
        >
          <div style={{ marginRight: "50px" }}>
            <Nav variant="underline">
              <NavLink to="/" className="nav-link">
                HOME
              </NavLink>

              <NavDropdown title="EVALUATION SERVICE" id="nav-dropdown">
                <NavDropdown.Item as={NavLink} to="/calculate" className="nav-dropdown-item">
                  CALCULATE YOUR DIAMOND
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={NavLink} to="/evaluationservice" className="nav-dropdown-item">
                  DIAMOND VALUATION SERVICE
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={NavLink} to="/policy" className="nav-dropdown-item">
                  DIAMOND VALUATION POLICY
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={NavLink} to="/typevaluation" className="nav-dropdown-item">
                  TYPE OF VALUATION
                </NavDropdown.Item>
              </NavDropdown>

              <NavLink to="/checkdiamond" className="nav-link">
                DIAMOND CHECK
              </NavLink>

              <NavLink to="/contact" className="nav-link">
                CONTACT US
              </NavLink>

              {user ? (
                <NavDropdown
                  title={`${user.firstName} ${user.lastName}`}
                  id="nav-dropdown"
                >
                  <NavDropdown.Item as={NavLink} to="/profile" className="nav-dropdown-item">
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/my-request" className="nav-dropdown-item">
                    My Request
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={NavLink} to="/my-order" className="nav-dropdown-item">
                    My Order
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout} className="nav-dropdown-item">
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <div style={{ marginBottom: "10px", marginLeft: "50px" }}>
                <NavLink to="/login" className="login-link">
                  <FaSignInAlt style={{ marginRight: "8px" }} />
                  LOGIN
                </NavLink>
              </div>
              )}
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
