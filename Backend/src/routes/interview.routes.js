const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const interviewController = require("../controllers/interview.controller")

const interviewRouter = express.Router()

/**
 * @routes POST /api/interview
 * @description generate new interview report on the basis of user self description , resume pdf and job description
 * @access private
 */
interviewRouter.post("/",authMiddleware.authuser,interviewController.generateInterViewReportController)

module.exports = interviewRouter