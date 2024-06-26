import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../utils/hook/useAuth';
import { logout } from '../../contexts/AuthContext/reducer';

function Header() {

    const navigate = useNavigate();

    const {user,dispatch} = useAuth()
    const handleLogout = () => {
        localStorage.removeItem('user');
        dispatch(logout())
        navigate('/login');
    }; 

    return (
        <Navbar expand="md" style={{ backgroundColor: '#E2FBF5' }}>
            <Container fluid>
                <Navbar.Brand href='#home' className='p-3 fw-bold fst-italic'>
                    <img
                        src='/src/assets/assetsStaff/diamond-svgrepo-com.svg'
                        width='60'
                        height='60'
                        alt='Logo'
                    /> 
                    Valuation Diamond
                </Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav" className="me-5 fw-bold justify-content-end">
                    <Nav variant='underline'>
                        <NavLink to="/evaluation-service" className="nav-link">Evaluation Service</NavLink>
                        <NavLink to="/setting" className="nav-link">Setting</NavLink>
                        {user &&  (
                            <NavDropdown title={`${user.firstName} ${user.lastName}`} id="nav-dropdown">
                                <NavDropdown.Item as={NavLink} to="/personal-info">My Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;