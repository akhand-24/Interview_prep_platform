const {GoogleGenAI}=require("@google/genai")
const z =require("zod")
const {zodToJsonSchema}= require("zod-to-json-schema");

const ai= new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
})

const interviewReportSchema =z.object({
    matchScore:z.number().min(0).max(100).describe("The match score between the applicant's resume and the job describe. It is a number between 0 and 100."),
    technicalQuestions:z.array(z.object({
        question: z.string().describe("What are the technical questions that can be asked in the interview?"),
        intention:z.string().describe("What was the intention of the interviewer to ask this question?"),
        answer:z.string().describe("How should an applicant answer the question? What points he must cover?")
    })).describe("A list of technical questions that can be asked in the interview, along with their intention and answer."),
    behaviourQuestions:z.array(z.object({
        question: z.string().describe("What are the behavioural questions that can be asked in the interview?"),
        intention:z.string().describe("What was the intention of the interviewer to ask this question?"),
        answer:z.string().describe("How should an applicant answer the question? What points he must cover?")
    })).describe("A list of behavioural questions that can be asked in the interview, along with their intention and answer."),
    skillGaps:z.array(z.object({
        skill: z.string().describe("What are the skills that the applicant is lacking?"),
        severity:z.enum(["low","medium","high"]).describe("How severe is the skill gap? Is it low, medium or high?")
    })).describe("A list of skill gaps that the applicant has, along with their severity."),
    preparationPlan:z.array(z.object({
        day:z.number().describe("Which day of the preparation plan is this?"),
        focus:z.string().describe("What is the focus of this day?"),
        tasks:z.array(z.string()).describe("What are the tasks that the applicant should do on this day?")
    })).describe("A list of preparation plans for the applicant, along with their focus and tasks.")

})



async function generateInterviewReport({resume,selfDescription,jobDescription}){
 const prompt = `
You are an expert technical recruiter.

Analyze the following candidate and job description.

You MUST return ONLY the fields defined in the response schema.

Do NOT add:
- summary
- strengths
- skillGapAnalysis
- recommendations
- any other fields

IMPORTANT:

technicalQuestions MUST contain objects with exactly:
question
intention
answer

behaviourQuestions MUST contain objects with exactly:
question
intention
answer

skillGaps MUST contain objects with exactly:
skill
severity

preparationPlan MUST contain objects with exactly:
day
focus
tasks

Generate 5 technical questions.

Generate 5 behavioural questions.

Generate all relevant skill gaps.

Generate a 7-day preparation plan.

The questions must be based specifically on the candidate's resume and the job description.

Do not invent experience that is not present in the resume.

RESUME:
${resume}

SELF DESCRIPTION:
${selfDescription}

JOB DESCRIPTION:
${jobDescription}
`;

    
try{
        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",

            contents: prompt,

            config: {
                responseMimeType: "application/json",

                responseSchema: {
                    type: "OBJECT",
                    properties: {
                        matchScore: {
                            type: "NUMBER",
                            minimum: 0,
                            maximum: 100
                        },

                        technicalQuestions: {
                            type: "ARRAY",
                            items: {
                                type: "OBJECT",
                                properties: {
                                    question: {
                                        type: "STRING"
                                    },
                                    intention: {
                                        type: "STRING"
                                    },
                                    answer: {
                                        type: "STRING"
                                    }
                                },
                                required: [
                                    "question",
                                    "intention",
                                    "answer"
                                ]
                            }
                        },

                        behaviourQuestions: {
                            type: "ARRAY",
                            items: {
                                type: "OBJECT",
                                properties: {
                                    question: {
                                        type: "STRING"
                                    },
                                    intention: {
                                        type: "STRING"
                                    },
                                    answer: {
                                        type: "STRING"
                                    }
                                },
                                required: [
                                    "question",
                                    "intention",
                                    "answer"
                                ]
                            }
                        },

                        skillGaps: {
                            type: "ARRAY",
                            items: {
                                type: "OBJECT",
                                properties: {
                                    skill: {
                                        type: "STRING"
                                    },
                                    severity: {
                                        type: "STRING",
                                        enum: [
                                            "low",
                                            "medium",
                                            "high"
                                        ]
                                    }
                                },
                                required: [
                                    "skill",
                                    "severity"
                                ]
                            }
                        },

                        preparationPlan: {
                            type: "ARRAY",
                            items: {
                                type: "OBJECT",
                                properties: {
                                    day: {
                                        type: "NUMBER"
                                    },
                                    focus: {
                                        type: "STRING"
                                    },
                                    tasks: {
                                        type: "ARRAY",
                                        items: {
                                            type: "STRING"
                                        }
                                    }
                                },
                                required: [
                                    "day",
                                    "focus",
                                    "tasks"
                                ]
                            }
                        }
                    },

                    required: [
                        "matchScore",
                        "technicalQuestions",
                        "behaviourQuestions",
                        "skillGaps",
                        "preparationPlan"
                    ]
                }
            }
        });
        const result = JSON.parse(response.text);

    const report= interviewReportSchema.parse(result);
    // console.log(report);

    return report
    

}
catch(error){
    console.error("Error generating interview report:", error);
    throw error;
}
    console.log(response.text)
}


module.exports=generateInterviewReport