import { useContext } from "react"
import { AuthContext } from "../services/auth.context"
import { login, logout, register } from "../services/auth.api.js";


export const useAuth=()=>{
    const context= useContext(AuthContext)
    const {user,setuser,loading,setloading}=context;

    const handlelogin= async ({email,password})=>{
        setloading(true);
        const data= await login({email,password});
        setuser(data.user)
        setloading(false)

    }
    const handleregister= async ({username,email,password})=>{
        setloading(true);
        const data= await register({username,email,password});
        setuser(data.user)
        setloading(false)

    }

     const handlelogout= async ()=>{
        setloading(true);
         await logout();
       setuser(null)
        setloading(false)

    }

    return {loading,user,handlelogin,handlelogout,handleregister};
}