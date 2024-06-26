import {Header} from '../component/componentAdmin/header/Header.jsx'
import AdminSideBar from '../component/componentAdmin/Body/sidebar/SideBar.jsx'
import { Outlet } from 'react-router-dom'
import React from 'react'
function AdminApp() {
  return (
    <>
    <div>
      <Header />
    </div>
    <div className='d-flex' style={{backgroundColor:'white'}} >
      <div className='w-25'>
        <AdminSideBar /> 
      </div>
      <div className='w-75 p-3 ps-4 fw-dark ' style={{backgroundColor:'#abf0e3'}}>
        <Outlet />
      </div>
    </div>
  </> 
  )
}

export default AdminApp;
