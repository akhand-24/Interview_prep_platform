const mongoose= require("mongoose")
require("dotenv").config()

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to DB")
    }
    catch(e){
        console.log(e)
        
    }
}

module.exports= {connectDB}