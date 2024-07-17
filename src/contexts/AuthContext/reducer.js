const INITIALIZE = 'INITIALIZE';
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

export function initialize (payload){
    return {
        type: INITIALIZE,
        payload: payload
    }
}

export function login (payload){
    return {
        type: LOGIN,
        payload: payload
    }
}

export function logout (payload){
    return {
        type: LOGOUT,
        payload: payload
    }
}

const reducerHandlers = {
    INITIALIZE : (state , action)=>{
        const{isAuthenticated, user} = action.payload;
        return {
            ...state,
            isAuthenticated,
            isInitialized:true,
            user,  
        }
        
    },
    LOGIN :(state, action)=>{
        const {user} = action.payload;
        return {
            ...state,
            isAuthenticated:true,
            user,
        }
    }
,
    LOGOUT :(state)=>{
        return {
            ...state,
            isAuthenticated:false,
            user:null
        }
    }

}
export function reducer (state, action) {
    if(!reducerHandlers[action.type]) return state
    return reducerHandlers[action.type](state, action)
}