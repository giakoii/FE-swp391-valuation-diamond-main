import React from 'react'
import useAuth from '../utils/hook/useAuth'

export const RoleBasedGuard = ({children, roles}) => {
    const {user} = useAuth();
    console.log(!roles.includes(user?.role))
    if(!roles.includes(user?.role)){
        return <div>Not found</div>
    }
    
    
  return children
}
 