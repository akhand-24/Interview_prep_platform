const express= require("express")
const { authuser } = require("../middlewares/auth.middleware")
const interviewrouter= express.Router()

interviewrouter.post("",authuser,(req,res)=>{
    
})


module.exports=interviewrouter
