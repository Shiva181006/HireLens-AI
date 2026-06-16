const { GoogleGenAI } = require("@google/genai")
require("dotenv").config()

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY
})

async function checkModels(){
  const models = await ai.models.list()

  for await (const model of models){
    console.log(model.name)
  }
}

checkModels()