const mongoose = require('mongoose')

/**
 * - Job description schema : String
 * - Resume text : String
 * - Self description : String
 * 
 * -matchScore : number
 * 
 * -Technical question : 
 *          [{
 *           question:"",
 *           intension for asling this question : "",
 *           answer:""
 *  }]
 * 
 * -Behaviorol question: 
 *             [{
 *           question:"",
 *           intension for asling this question : "",
 *           answer:""
 * }]
 * 
 * - Skill gaps : [{
 *                skill:"",
 *                severity:{
 *                    type: String,
 *                     enum: ["low","medium","high"]
 *                 }             
 * }]
 * 
 * -Preparation plan : [{
 *            day:Number,
 *            focus: String,
 *            tasks:String
 * }]
 */

const technicalQuestionSchema = new mongoose.Schema({
  question : {
    type : String,
    required : [true ,"Technical Question is required"]
  },
  intension : {
    type : String,
    required : [ true , "Intension is required"]
  },
  answer : {
    type : String,
    required : [true ,"Answer is required"]
  }
},  {
  _id:false
})

const behavioralQuestionSchema = new mongoose.Schema({
  question : {
    type : String,
    required : [true ,"Technical Question is required"]
  },
  intension : {
    type : String,
    required : [ true , "Intension is required"]
  },
  answer : {
    type : String,
    required : [true ,"Answer is required"]
  }
},  {
  _id:false
})

const skillGapSchema = new mongoose.Schema({
  skill : {
    type : String,
    required : [true , "Skill is required"]
  },
  severity : {
    type : String ,
    enum : ["low" ,"medium", "high"],
    required : [true , "Severity is requird"]
  }
},{
  _id: false
})

const preparationPlanSchema = new mongoose.Schema({
  day:{
    type:Number,
    required : [true , "Day is required"]
  },
  focus:{
    type : String,
    required : [true ,"Focus is requird"]
  },
  tasks:[{
    type:String,
    rquired : [true ,"Task is requird"]
  }]
})

const interviewReportSchema = new mongoose.Schema({
  jobDescription: {
    type : String,
    required : [ true , "Job description is required"]
  },
  resume : {
    type : String,
  },
  selfDescription : {
    type : String,
  },
  matchScore : {
    type : Number,
    min : 0,
    max : 100,
  },
  technicalQuesions : [ technicalQuestionSchema],
  behavioralQuestions : [ behavioralQuestionSchema ],
  skillGaps : [ skillGapSchema ],
  preparationPlan : [ preparationPlanSchema ] 
},{
  timestamps : true
})

const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema);

module.exports = interviewReportModel;