import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router'
import { useAuth } from './hooks/useAuth';

const Register = () => {
  const navigate=useNavigate();

  const {loading,handleregister}=useAuth()
  const [username,setusername]=useState("")
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")

  const handlesubmit=async ()=>{
    await  handlesubmit({username,email,password});
    navigate("/") //go to dashboard
  } 

  return (
    <div>
      register
    </div>
  )
}

export default Register
