const express = require("express");
const router = express.Router();
const authpost = require("../controller/auth/login.js");
const resetpassword = require("../controller/auth/resetpassword.js");
const passwordforgot = require("../controller/auth/forgetpassword.js");
const { auth } = require("../middleare/auth");
const validate = require("../validation/header");
const rules = require("../validation/auth.validation");

// router.use(auth);

router.post("/login", validate(rules.login), authpost.PostAuthlogin);

router.post( "/reset-password", auth , validate(rules.resetpassword), resetpassword.resetpassword);

router.post("/forgot-password", validate(rules.forgetPassword),passwordforgot.forgotpassword);

module.exports = router;
