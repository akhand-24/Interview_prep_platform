const express= require("express")
const { authuser } = require("../middlewares/auth.middleware")
const pdfparse =require("pdf-parse")
const upload = require("../middlewares/files.middleware")
const generateInterviewReport = require("../services/ai.service")
const interviewreportModel = require("../models/interviewReport.model")
const interviewrouter= express.Router()

interviewrouter.post("",authuser,upload.single("resume") ,async (req,res)=>{

    console.log("at interview route")
    const resumecontent=await (new pdfparse.PDFParse(Uint8Array.from(req.file.buffer))).getText()  
    const {selfDescription,jobDescription}=req.body

    const interviewReport= await generateInterviewReport({
        resume:resumecontent.text,
        selfDescription,
        jobDescription
    })

    const newreport=await interviewreportModel.create({
        resume:resumecontent.text,
        selfDescription,
        jobDescription,
        ...interviewReport
    })

    res.json({
        message:"Interview Report Created!",
        interviewReport:newreport
    })
})


module.exports=interviewrouter
