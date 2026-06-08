// const express = require("express")  oR  const {Router} = require("express")
// const authRouter = express.Router() OR  const authRouter = Router()

const express = require("express")
const authController = require('../controllers/auth.controller')

const authRouter = express.Router()


// @route POST /api/auth/register
// @description Register a new user
// @acces Public

authRouter.post("/register",authController.registerUserController)

/**
 * @route POST /api/auth/login
 * @desc Login User with email and password
 * @access Public
 */
authRouter.post("/login",authController.loginUserController)

/**
 * @route GET /api/auth/logout
 * @description clear token from the user and add the token in blacklist
 * @access Public
 */
authRouter.get("/logout",authController.logoutUserController)

/**
 * @route GET /api/auth/ge
 */


module.exports = authRouter