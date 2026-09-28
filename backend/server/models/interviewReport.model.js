const mongoose =require("mongoose")

const interviewreportschema=new mongoose.Schema({
    jobDescription:{
        type: String,
        required:true 
    },
    resume:{
        type: String
    },
    selfDescription:{
        type:String 
    },
    matchScore:{
        type:Number,
        min:0,
        max:100
    },
    technicalQuestions:[technicalQuestionSchema],
    behavioralQuestions:[behaviouralQuestionSchema],
    skillGaps:[skillGapSchema],
    PreperationPlan:[preperationplanSchema]


})

const technicalQuestionSchema=new mongoose({
    question:{
        type:String 
    },
    intention:{
        type:String 
    },
    answer:{
        type:String 
    }

},{_id: false})

const behaviouralQuestionSchema=new mongoose({
    question:{
        type:String 
    },
    intention:{
        type:String 
    },
    answer:{
        type:String 
    }

},{_id: false})

const skillGapSchema = new mongoose({
    skill:{
        type:String,
        required:true 
    },
    severity:{
        type: String,
        enum:["low","medium","high"],
        required:true
    }
},{_id:false})

const preperationplanSchema= new mongoose({
    day:{
        type:Number 
        , required:true 
    },
    focus:{
        type:String , required:true 
    },
    tasks:[
        {
            type:String
        }
    ]

})

const interviewreportModel=mongoose.model("InterviewReportModel",interviewreportschema)

module.exports=interviewreportModel