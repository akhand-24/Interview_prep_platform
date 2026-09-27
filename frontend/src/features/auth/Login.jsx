import React, { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { useNavigate } from 'react-router'

const Login = () => {
  const navigate=useNavigate()
  const {loading,handlelogin}= useAuth()

  const [email,setemail]=useState()
  const [password,setpassword]=useState()

  const handlesubmit=async ()=>{
    await handlelogin({email,password})
  }
  navigate("/")

  return (
    <div>
      login
    </div>
  )
}

export default Login
