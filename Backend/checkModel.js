const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();


const ai = new GoogleGenAI({

    apiKey: process.env.GEMINI_API_KEY

});


// Free models best for HireLens AI
// priority order
const bestFreeModels = [

    "models/gemini-2.5-flash-lite",

    "models/gemini-2.0-flash-lite",

    "models/gemini-2.0-flash",

    "models/gemini-1.5-flash"

];



// models good but may have quota / availability issue
const futureModels = [

    "models/gemini-2.5-flash",

    "models/gemini-2.5-flash-lite",

    "models/gemini-1.5-pro"

];




async function checkModels(){


    try{


        const models = await ai.models.list();


        let available = [];



        console.log("\n==============================");
        console.log("✅ FREE MODELS AVAILABLE NOW");
        console.log("==============================\n");



        for await(const model of models){


            if(
                model.supportedActions &&
                model.supportedActions.includes("generateContent")
            ){


                available.push(model.name);



                if(bestFreeModels.includes(model.name)){


                    console.log(
                        "🟢",
                        model.name.replace("models/","")
                    );


                }


            }


        }




        console.log("\n==============================");
        console.log("⏳ GOOD MODELS (NOT AVAILABLE NOW)");
        console.log("==============================\n");



        futureModels.forEach(model=>{


            if(!available.includes(model)){


                console.log(
                    "🔒",
                    model.replace("models/","")
                );


            }


        });





        console.log("\n==============================");
        console.log("🔥 USE THIS MODEL RIGHT NOW");
        console.log("==============================\n");



        const selectedModel = bestFreeModels.find(

            model => available.includes(model)

        );



        if(selectedModel){


            console.log(
`
model: "${selectedModel.replace("models/","")}"
`
            );


        }

        else{


            console.log(
                "No free flash model available"
            );


        }





    }


    catch(error){


        console.log("ERROR:");
        console.log(error.message);


    }


}



checkModels();