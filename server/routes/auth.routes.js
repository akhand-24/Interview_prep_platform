const express= require("express");
const { default: mongoose } = require("mongoose");
const usermodel = require("../models");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


const authrouter= express.Router()

authrouter.post("/register",async function(req,res){
    const {username, password,email}=req.body;

    if(!username || !password || !email)
    {
       return res.status(400).json({
            message:"Provide username, password and email"
        })
    }

    const user= await usermodel.findOne({
        $or:[
            {username:username},
            {email: email}
        ]
    })

    if(user)
    {
       return res.json({
            message:"User already exist"
        })
    }

    const hash=await bcrypt.hash(password,10);
    
   user=await usermodel.create({
    username:username,
    email:email,
    password:hash
   })
   const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})

   res.cookie("token",token);

   res.status(201).json({message:"User created successfully",user:{
    id:user._id,username,email
   }})

})

authrouter.post("/login",async function(req,res){
    const {email,password}=req.body
    const user = await usermodel.findOne({
        email
    })

    if(!user)
    {
        res.json({message:"Email do not exist"})
    }

    const ispasswordcorrect=await bcrypt.compare(password,user.password);

    if(!ispasswordcorrect)
    {
       return res.status(400).json({message:"Incorrect password"})
    }

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})

   res.cookie("token",token);

   res.status(201).json({message:"User Logged In successfully",user:{
    id:user._id,username,email
   }})    

})


module.exports=authrouter