import Header from '../component/componentValuationStaff/Header.jsx'
import { SideBar } from '../component/componentValuationStaff/SideBar.jsx'
import { Outlet } from 'react-router-dom'
import React from 'react'

function ValuationApp () {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className='d-flex' style={{backgroundColor:'#EDEDED'}} >
        <div  style={{width:'17%'}}>
          <SideBar /> 
        </div>
        <div style={{backgroundColor:'white',width:'93%'}}>
          <Outlet />
        </div>
      </div>
    </>
 
  )
}
export default ValuationApp