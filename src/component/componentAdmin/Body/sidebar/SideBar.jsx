import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import '../../../componentAdmin/Body/sidebar/SideBarAdmin.css';
const AdminSideBar = () => {
    const [manageAccountOpen, setManageAccountOpen] = useState(false);

    const toggleManageAccount = () => {
        setManageAccountOpen(!manageAccountOpen);
    };
    return (
        <Navbar className="flex-column w-100" style={{ backgroundColor: '#263543', height: '100vh' }}>
            <Nav className="flex-column w-100 p-2 menu fw-bold">
                <NavLink className='nav-link admin mt-2 mx-2' to="/admin/dashboard">
                    Dashboard
                </NavLink>
                <div className='nav-link admin mx-2' onClick={toggleManageAccount} style={{ cursor: 'pointer' }}>
                    Manage Account {manageAccountOpen ? <FaCaretUp /> : <FaCaretDown />}
                </div>
                {manageAccountOpen && (
                    <div className='pl-3'>
                        <NavLink className='nav-link admin mx-4 p-1' to="/admin/managestaff">Manage Staff</NavLink>
                        <NavLink className='nav-link admin mx-4 p-1' to="/admin/managecustomer">Manage Customer</NavLink>
                    </div>
                )}
                <NavLink className='nav-link admin mx-2' to="/admin/manageschedule">Manage Schedule</NavLink>
            
    
                <NavLink className='nav-link admin mx-2' to="/admin/manageservice">Manage Service</NavLink>
            </Nav>
        </Navbar>
    );
}

export default AdminSideBar;
