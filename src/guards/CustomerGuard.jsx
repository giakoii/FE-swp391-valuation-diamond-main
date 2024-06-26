import React from 'react'
import useAuth from '../utils/hook/useAuth'
import { CUSTOMER } from '../utils/constants/role';



export const CustomerGuard = ({children}) => {
    const {user} = useAuth();
    console.log(user,CUSTOMER)
    if(user && user.role !== CUSTOMER){     
        return <div>Not found</div>
    }
  return children
}
 