import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../component/componentAdmin/header/Header.jsx';
import AdminSideBar from '../component/componentAdmin/Body/sidebar/SideBar.jsx';
import { ScheduleProvider } from '../contexts/ScheduleContext.jsx';

function AdminApp() {
  const location = useLocation();
  const isDashboard = location.pathname === "/admin/dashboard";

  return (
    <ScheduleProvider>
      <div>
        <Header />
      </div>
      <div className='d-flex' style={{ backgroundColor: 'white' }}>
        <div className='w-25'>
          <AdminSideBar />
        </div>
        <div
          className='w-75 p-3 ps-4 fw-dark'
          style={{ backgroundColor: isDashboard ? '#2a3447' : '#abf0e3'  }}
        >
          <Outlet />
        </div>
      </div>
    </ScheduleProvider>
  );
}

export default AdminApp;
