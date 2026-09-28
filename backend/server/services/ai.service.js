const {GoogleGenAI}=require("@google/genai")
const z =require("zod")

const ai= new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
})

async function invokegemini(){
    const response= await ai.models.generateContent({
        model:"gemini-3.5-flash-lite",
        contents:"Hello gemini, explain what is gemini"
    })

    console.log(response.text);
    
}

module.exports= invokegemini