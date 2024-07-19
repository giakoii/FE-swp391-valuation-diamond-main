import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

export const SideBar = () => {
    return (
        <Navbar className="flex-column w-100 mt-4 rounded" style={{ backgroundColor: '#D9D9D9', height: '100vh' }}>
            <Nav className="flex-column w-100 p-2 menu fw-bold">
                <NavLink className='nav-link' to="/valuation-staff/valuation-order">Valuation's Product</NavLink>  
                <NavLink className='nav-link' to="/valuation-staff/certificate-list">Certificate List</NavLink>  
            </Nav>
        </Navbar>
    );
};
