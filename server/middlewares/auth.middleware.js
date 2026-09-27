const jwt= require("jsonwebtoken")

function authuser(req,res,next){
    const token=req.cookies.token
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