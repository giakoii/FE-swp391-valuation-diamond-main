import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
const useAuth = ()=>{
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("Auth context must be used within an AuthProvide")
    }
    return context;
}
export default useAuth
