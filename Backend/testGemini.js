require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

console.log(
    "KEY:",
    process.env.GEMINI_API_KEY?.substring(0,10)
);

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function test(){

    try{

        const response = await ai.models.generateContent({
            model:"gemini-2.5-flash-lite",
            contents:"say hello"
        });

        console.log(response.text);

    }
    catch(error){

        console.log("ERROR:");
        console.log(error.message);

    }

}

test();