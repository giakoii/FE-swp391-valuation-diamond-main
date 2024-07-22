import { createContext, useEffect, useLayoutEffect, useReducer, useState } from "react";
import { reducer } from "./reducer";
import { initialize } from "./reducer";

const initialState = {
    isAuthenticated:false,
    isInitialized:false,
    user:null,
}
// Create Context
const AuthContext = createContext({
    ...initialState,
    dispatch: ()=>null,
})
// Create Provider
const AuthProvider = ({children})=>{
    const [state, dispatch] = useReducer(reducer,initialState);
    useLayoutEffect(()=>{
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if(storedUser){
            return dispatch(initialize({isAuthenticated:true, user:storedUser}))
        }else{
            return dispatch(initialize({isAuthenticated:false, user:null}))
        }
    },[])
    return <AuthContext.Provider value={{...state, dispatch}}>
        {state.isInitialized ? children : null}
    </AuthContext.Provider>
}
export {AuthContext, AuthProvider} 