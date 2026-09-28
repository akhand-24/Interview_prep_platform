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

interviewrouter.get("", authuser, async (req, res) => {
    try {
        console.log("Logged-in user ID:", req.user?.id);

        const reports = await interviewreportModel
            .find({ user: req.user.id }, { jobDescription: 1, matchScore: 1 })
            .sort({ _id: -1 });

        console.log("Found reports count:", reports.length);

        const formattedReports = reports.map((r) => ({
            _id: r._id,
            jobDescription: (r.jobDescription || "").slice(0, 30) + "...",
            matchScore: r.matchScore,
        }));

        return res.status(200).json({
            message: "Interview Record Fetched",
            reports: formattedReports,
        });
    } catch (err) {
        console.error("Error in GET /api/interview:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
});


    


 



module.exports=interviewrouter
