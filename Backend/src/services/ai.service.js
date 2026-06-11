const { GoogleGenAI } = require('@google/genai')


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

async function invokeGeminiAi(prompt) {

  try {

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;

  } catch (error) {

    console.log("Gemini Error:", error.message);

    return "AI service is busy. Please try again later.";
  }
}


module.exports = invokeGeminiAi

