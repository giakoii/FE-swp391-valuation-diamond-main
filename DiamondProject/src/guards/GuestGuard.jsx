import React from 'react'
import useAuth from '../utils/hook/useAuth'
import { Navigate } from 'react-router-dom'

export const GuestGuard = ({children}) => {
    const {isAuthenticated,isInitialized} = useAuth()
    if(isAuthenticated){
        return <Navigate to='/home' />
    }
    if(!isInitialized){
        return;
    }
  return children
}
 