const jwt= require("jsonwebtoken")
const blacklistmodel = require("../models/blacklist.model")

async function authuser(req,res,next){

    const token=req.cookies.token

    const isblacklisted=await blacklistmodel.findOne({token})

    if(isblacklisted){
        return res.json({
            message:"Token Invalid"
        })
    }
    if(!token)
    {
       return res.json({message:"Token not provided"})
    }

    try {

        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        req.user=decoded;

        next()
        
    } catch (error) {
       return res.json({message:"Wrong Token"})
    }
}

module.exports={authuser}