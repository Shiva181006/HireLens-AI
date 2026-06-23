const pdfParse = require("pdf-parse");
const {
  generateInterviewReport,
  generateResumePdf,
} = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */

// async function generateInterViewReportController(req, res) {
//   const { selfDescription, jobDescription } = req.body;

//   let resumeContent = {
//     text: "",
//   };

//   if (req.file) {
//     resumeContent = await new pdfParse.PDFParse(
//       Uint8Array.from(req.file.buffer),
//     ).getText();
//   }

//   const interViewReportByAi = await generateInterviewReport({
//     resume: resumeContent.text,
//     selfDescription,
//     jobDescription,
//   });

  

//   interViewReportByAi.skillGaps =
// interViewReportByAi.skillGaps.map((gap)=>({

//     ...gap,

//     severity:
//     gap.severity.toLowerCase()

// }))

//   try {
//     const interviewReport = await interviewReportModel.create({
//       user: req.user.id,

//       resume: resumeContent.text,

//       selfDescription,

//       jobDescription,

//       title: interViewReportByAi.jobTitle || "Software Developer",

//       matchScore: interViewReportByAi.matchScore,

//       technicalQuestions: interViewReportByAi.technicalQuestions,

//       behavioralQuestions: interViewReportByAi.behavioralQuestions,

//       skillGaps: interViewReportByAi.skillGaps,

//       preparationPlan: interViewReportByAi.preparationPlan,
//     });

//     console.log("SAVED REPORT =====>", interviewReport);

//     return res.status(201).json({
//       message: "Interview report generated successfully",

//       interviewReport,
//     });
//   } catch (error) {
//     console.log("DATABASE ERROR =====>", error.message);

//     return res.status(500).json({
//       message: error.message,
//     });
//   }

//   console.log("SAVED REPORT =====>", interviewReport);

//   res.status(201).json({
//     message: "Interview report generated successfully.",

//     interviewReport,
//   });
// }
async function generateInterViewReportController(req, res) {

  console.log("🔥 INTERVIEW CONTROLLER HIT");

  try {

    const { selfDescription, jobDescription } = req.body;

    let resumeContent = {
      text: "",
    };


  if(req.file){

  resumeContent = await new pdfParse.PDFParse(
    Uint8Array.from(req.file.buffer)
  ).getText();

}


    const interViewReportByAi = await generateInterviewReport({

      resume: resumeContent.text,

      selfDescription,

      jobDescription,

    });


    console.log(
      "AI RESPONSE =====>",
      interViewReportByAi
    );


    if(interViewReportByAi.skillGaps){

      interViewReportByAi.skillGaps =
      interViewReportByAi.skillGaps.map((gap)=>({

        ...gap,

        severity: gap.severity?.toLowerCase()

      }));

    }



    const interviewReport = await interviewReportModel.create({

      user:req.user.id,

      resume:resumeContent.text,

      selfDescription,

      jobDescription,

      title:
      interViewReportByAi.title ||
      "Software Developer",

      matchScore:
      interViewReportByAi.matchScore,

      technicalQuestions:
      interViewReportByAi.technicalQuestions,

      behavioralQuestions:
      interViewReportByAi.behavioralQuestions,

      skillGaps:
      interViewReportByAi.skillGaps,

      preparationPlan:
      interViewReportByAi.preparationPlan,

    });


    console.log(
      "SAVED REPORT =====>",
      interviewReport._id
    );


    return res.status(201).json({

      message:
      "Interview report generated successfully",

      interviewReport,

    });


  }
  catch(error){

  console.log("========== ERROR START ==========");
  console.log(error);
  console.log("========== ERROR END ==========");


  // Gemini limit exceeded
  if(error.status === 429){

    return res.status(429).json({

      message:
      "AI limit exceeded. Please try again after some time."

    });

  }


  // Gemini server busy
  if(error.status === 503){

    return res.status(503).json({

      message:
      "AI service is busy right now. Please try again later."

    });

  }


  return res.status(500).json({

    message:
    "Report generation failed. Please try again."

  });

}

}

/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res) {
  const { interviewId } = req.params;

  const interviewReport = await interviewReportModel.findOne({
    _id: interviewId,
    user: req.user.id,
  });

  if (!interviewReport) {
    return res.status(404).json({
      message: "Interview report not found.",
    });
  }

  res.status(200).json({
    message: "Interview report fetched successfully.",
    interviewReport,
  });
}

/**
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res) {
  const interviewReports = await interviewReportModel
    .find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .select(
      "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan",
    );

  res.status(200).json({
    message: "Interview reports fetched successfully.",
    interviewReports,
  });
}

/**
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 */
async function generateResumePdfController(req, res) {
  const { interviewReportId } = req.params;

  const interviewReport =
    await interviewReportModel.findById(interviewReportId);

  if (!interviewReport) {
    return res.status(404).json({
      message: "Interview report not found.",
    });
  }

  const { resume, jobDescription, selfDescription } = interviewReport;

  const pdfBuffer = await generateResumePdf({
    resume,
    jobDescription,
    selfDescription,
  });

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`,
  });

  res.send(pdfBuffer);
}

module.exports = {
  generateInterViewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportsController,
  generateResumePdfController,
};
