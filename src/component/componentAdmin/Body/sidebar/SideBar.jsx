import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { Badge } from 'react-bootstrap';
import '../../../componentAdmin/Body/sidebar/SideBarAdmin.css';

const AdminSideBar = () => {
  const [manageAccountOpen, setManageAccountOpen] = useState(false);
  const [manageScheduleCount, setManageScheduleCount] = useState(0);

  useEffect(() => {
    const fetchScheduleCount = async () => {
      try {
        const response = await fetch('https://valuation.techtheworld.id.vn/order_detail_request/countOrderDetailWithEvaluationStaffIdIsNull');
        if (!response.ok) {
          throw new Error('Failed to fetch schedule count');
        }
        const data = await response.json();
        setManageScheduleCount(data.count);
      } catch (error) {
        console.error('Error fetching schedule count:', error);
      }
    };

    fetchScheduleCount();
  }, []);

  const toggleManageAccount = () => {
    setManageAccountOpen(!manageAccountOpen);
  };

  return (
    <Navbar className="flex-column w-100" style={{ backgroundColor: '#2a3447', height: '100vh' }}>
      <Nav className="flex-column w-100 p-2 menu fw-bold">
        <NavLink className='nav-link admin mt-2 mx-2 py-2' to="/admin/dashboard">
          <img
            src='/assetsAdmin/housedoor.svg'
            width='30'
            height='30'
            className='mx-3'
            alt='housedoor'
          />
          HomePage
        </NavLink>
        <div className='nav-link admin mx-2 my-3' onClick={toggleManageAccount} style={{ cursor: 'pointer' }}>
          <img
            src='/assetsAdmin/people.svg'
            width='30'
            height='30'
            className='mx-3'
            alt='people'
          />
          Manage Account {manageAccountOpen ? <FaCaretUp /> : <FaCaretDown />}
        </div>
        {manageAccountOpen && (
          <div className='pl-3 mx-4'>
            <NavLink className='nav-link admin mx-4 p-1 px-5' to="/admin/managestaff">Manage Staff</NavLink>
            <NavLink className='nav-link admin mx-4 p-1 px-5' to="/admin/managecustomer">Manage Customer</NavLink>
          </div>
        )}
        <NavLink className='nav-link admin mx-2 my-3' to="/admin/manageschedule">
          <img
            src='/assetsAdmin/calender.svg'
            width='30'
            height='30'
            className='mx-3'
            alt='calender'
          />
          Manage Schedule <Badge bg="warning" className='mx-5'>{manageScheduleCount}</Badge>
        </NavLink>
        <NavLink className='nav-link admin mx-2' to="/admin/manageservice">
          <img
            src='/assetsAdmin/board.svg'
            width='30'
            height='30'
            className='mx-3'
            alt='board'
          />
          Manage Service
        </NavLink>
      </Nav>
    </Navbar>
  );
};

export default AdminSideBar;
