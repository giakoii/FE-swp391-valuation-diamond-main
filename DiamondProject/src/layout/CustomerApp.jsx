import { Outlet } from 'react-router-dom';
import Footer from '../component/componentCustomer/Footer/Footer.jsx'
import Header from '../component/componentCustomer/Header/Header.jsx'
import React from 'react'
function CustomerApp() {

   return (
    <>
      <div className="header">
        <Header />
      </div>
      <div className="main">
       <Outlet/>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  )
} 

export default CustomerApp
