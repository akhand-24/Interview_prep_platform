const express=require("express");
const { connectDB } = require("./server/database");
const authrouter = require("./server/routes/auth.routes");
require("dotenv").config()

const port=process.env.port

const app= express();
app.use(express.json());

app.use("api/auth",authrouter)


connectDB();

app.listen(port,()=>{
    console.log(`server is running at ${port}`);
    
})