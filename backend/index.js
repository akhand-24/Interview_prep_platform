const express=require("express");
const cors=require("cors")
const { connectDB } = require("./server/database");
const authrouter = require("./server/routes/auth.routes");
const cookieParser = require("cookie-parser");
const interviewrouter = require("./server/routes/interview.routes");
require("dotenv").config()



const port=process.env.PORT

const app= express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
origin:true,
credentials:true
}))

app.use("/api/auth",authrouter)

app.use("/api/interview",interviewrouter)

connectDB();

app.listen(port,()=>{
    console.log(`server is running at ${port}`);
    
})