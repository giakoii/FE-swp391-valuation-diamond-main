import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import '../SideBar/SideBar.css';

export const SideBar = () => {
    return (
        <Navbar className="flex-column w-100 mt-4 rounded" style={{ backgroundColor: '#D9D9D9', height: '100vh' }}>
            <Form className="d-flex p-2">
                <Form.Control
                    type="search"
                    placeholder="Enter id"
                    className="me-2"
                    aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
            </Form>
            <Nav className="flex-column w-100 p-2 menu fw-bold">
                <NavLink className='nav-link' to="/staff/user-request">Receive User Requests</NavLink>
                <NavLink className='nav-link' to="/staff/view-receipt">View All Recipt</NavLink>
                <NavLink className='nav-link' to="/staff/commitment-list">Commitment Page List</NavLink>
                <NavLink className='nav-link' to="/staff/valuation-result-list">Remake Valuation Result</NavLink>
            </Nav>
        </Navbar>
    );
};
