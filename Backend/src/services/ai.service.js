const { GoogleGenAI } = require('@google/genai')

const { z } = require("zod") // for Structured output
const { zodToJsonSchema } = require("zod-to-json-schema")


const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY
})

// async function invokeGeminiAi (){

//   const response = await ai.models.generateContent({
//     model:"gemini-2.5-flash",
//     contents: "Hello Gemini ! Explain what is interview ?"
//   })
  
//   console.log(response.text)

// }

// structure how ai answer the question 
const interviewReportSchema = z.object({

  matchScore : z.number().describe("A score between 0 ans 100 indicating how well the candidate's profile matches the job describe"),

  technicalQuestions : z.array(z.object({
    question: z.string().describe("The technical question that can be asked in the interview"),
    intention: z.string().describe("The intension of interviewer behind asking this question"),
    answer : z.string().describe("How to answer this question , what points to cover , what approach to take etc.")
  })).describe("Technical question that can be asked in the interview along with their intension and how to answer them "),

  behavioralQuestions : z.array(z.object({
    question: z.string().describe("The technical question that can be asked in the interview"),
    intention: z.string().describe("The intension of interviewer behind asking this question"),
    answer : z.string().describe("How to answer this question , what points to cover , what approach to take etc.")
  })).describe("Behavioral question that can be asked in the interview along with their intension and how to answer them "),

  skillGaps: z.array(z.object({
    skill: z.string().describe("The skill which the candidate is lacking"),
    severity: z.enum(["low","medium","high"]).describe("The severity of this skill gap , i.e how important is the skill for the job ")
  })).describe("List of the skill gap in the candidate's profile along with their severity"),
  preparationPlan : z.array(z.object({
    day : z.number().describe("The day number in the preparation plan , starting from 1 "),
    focus : z.string().describe("The main focus of this day in the preparation plan , e.g. data structure , system design , mock interview"),
    tasks : z.array(z.string()).describe("List of task to be done on this day to follow the preparation plan , e.g. read a specific book  ")
  })).describe("A day-wise preparation plan for candidate to follow in order to prepare for the interview effectively")
})

async function generateInterviewReport({ resume , selfDescription , jobDescription}){

  const prompt = `Generate an interview report for a candidate with the following details:
                  Resume: ${resume}
                  Self Description : ${selfDescription}
                  Job Description : ${jobDescription}`

  const response = await ai.models.generateContent({
    model : "gemini-2.5-flash",
    contents : prompt,
    config : {
      responseMimeType : "application/json",
      responseSchema : zodToJsonSchema(interviewReportSchema)
    }
  })

  return JSON.parse(response.text);

}



module.exports = generateInterviewReport

