const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});


async function checkModels(){

  try{

    const models = await ai.models.list();

    for await (const model of models){

      console.log("---------------------");
      console.log("MODEL:", model.name);

      if(model.supportedActions){
        console.log("ACTIONS:", model.supportedActions);
      }

    }

  }
  catch(error){

    console.log("ERROR:");
    console.log(error.message);

  }

}


checkModels();