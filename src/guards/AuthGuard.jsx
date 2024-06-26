import React from 'react'
import useAuth from '../utils/hook/useAuth'
import { Navigate } from 'react-router-dom';

export const AuthGuard = ({children}) => {
    const {isAuthenticated,isInitialized} = useAuth();
    if(!isAuthenticated){
        return <Navigate to='/login' />
    }
    //Loading
    if(!isInitialized){
        return;
    }
  return children

}
 