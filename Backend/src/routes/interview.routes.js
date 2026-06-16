// const express = require("express")
// const authMiddleware = require("../middlewares/auth.middleware")
// const interviewController = require("../controllers/interview.controller.js")
// const upload = require("../middlewares/file.middleware")

// const interviewRouter = express.Router()

// /**
//  * @routes POST /api/interview
//  * @description generate new interview report on the basis of user self description , resume pdf and job description
//  * @access private
//  */

// // console.log("AUTH =>", authMiddleware.authuser)
// // console.log("UPLOAD =>", upload.single)
// // console.log("CONTROLLER =>", interviewController.generateInterviewReportController)
// interviewRouter.post("/",authMiddleware.authUser, upload.single("resume") ,interviewController.generateInterviewReportController)

// module.exports = interviewRouter

const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")

const interviewRouter = express.Router()



/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user self description,resume pdf and job description.
 * @access private
 */
interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), interviewController.generateInterViewReportController)

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId.
 * @access private
 */
interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportByIdController)


/**
 * @route GET /api/interview/
 * @description get all interview reports of logged in user.
 * @access private
 */
interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReportsController)


/**
 * @route GET /api/interview/resume/pdf
 * @description generate resume pdf on the basis of user self description, resume content and job description.
 * @access private
 */
interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware.authUser, interviewController.generateResumePdfController)



module.exports = interviewRouter