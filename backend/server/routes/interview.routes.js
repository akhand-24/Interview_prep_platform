const express= require("express")
const { authuser } = require("../middlewares/auth.middleware")
const pdfparse =require("pdf-parse")
const upload = require("../middlewares/files.middleware")
const generateInterviewReport = require("../services/ai.service")
const interviewreportModel = require("../models/interviewReport.model")
const interviewrouter= express.Router()

interviewrouter.post("",authuser,upload.single("resume") ,async (req,res)=>{

    const userId=req.user.id
    const resumecontent=await (new pdfparse.PDFParse(Uint8Array.from(req.file.buffer))).getText()  
    const {selfDescription,jobDescription}=req.body

    const interviewReport= await generateInterviewReport({
        resume:resumecontent.text,
        selfDescription,
        jobDescription
    })

    const newreport=await interviewreportModel.create({
        resume:resumecontent.text,
        user:userId,
        selfDescription,
        jobDescription,
        ...interviewReport
    })

    res.json({
        message:"Interview Report Created!",
        interviewReport:newreport
    })
})

interviewrouter.get("/report/:interviewId",authuser,async(req,res)=>{
    const {interviewId}=req.params

    const interviewReport= await interviewreportModel.findOne({_id:interviewId})

    if(!interviewReport)
{
  return  res.json({message:"No recorded report found"})
}

res.status(200).json({
    message:"Interview Record Fetched",
    interviewReport
})
        
})

interviewrouter.get("",authuser,async (req,res)=>{
    
    const userId = new mongoose.Types.ObjectId(req.user.id);

   const reports = await interviewreportModel.aggregate([
    {
        $match: {
            user: userId
        }
    },
    {
        $project: {
            jobDescription: {
                $concat: [
                    { $substrCP: ["$jobDescription", 0, 30] },
                    "..."
                ]
            },
            matchScore: 1
        }
    }
]);

 

res.status(200).json({
    message:"Interview Record Fetched",
    reports
})
})

module.exports=interviewrouter
