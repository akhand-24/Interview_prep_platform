const express=require("express");
const { connectDB } = require("./server/database");
const authrouter = require("./server/routes/auth.routes");
const cookieParser = require("cookie-parser");
require("dotenv").config()

const port=process.env.port

const app= express();
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth",authrouter)


connectDB();

app.listen(port,()=>{
    console.log(`server is running at ${port}`);
    
})