const express=require("express");
const cors=require("cors")
const { connectDB } = require("./server/database");
const authrouter = require("./server/routes/auth.routes");
const cookieParser = require("cookie-parser");
require("dotenv").config()

const port=process.env.port

const app= express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
origin:true,
credentials:true
}))

app.use("/api/auth",authrouter)


connectDB();

app.listen(port,()=>{
    console.log(`server is running at ${port}`);
    
})