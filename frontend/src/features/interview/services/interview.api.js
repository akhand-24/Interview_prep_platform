const axios= require("axios")
const { BASE_URL } = require("../../../../config")

const api= axios.create({
    baseURL:BASE_URL,
    withCredentials:true 

})

export const generateInterviewReport= async({jobDescription,resumeFile,selfDescription})=>{
        const formData=new FormData()
        formData.append("jobDescription",jobDescription)
        formData.append("resume",resumeFile)
        formData.append("selfDescription",selfDescription)

        const response= await api.post("/api/interview",formData,
            {
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }
        )

        return response.data

}

export const getInterviewReportById= async (interviewId)=>{
    const response = await api.get(`api/interview/report/${interviewId}`)

    return response.data;
}

export const getAllInterviewReports= async ()=>{
    const response= await api.get("api/interview")

    return response.data;
}