const express = require("express");
const { currentUser, verifyOtp, resendOtp } = require("../controller/user");
const { register, login } = require("../controller/user");
const { authMiddleWare} = require("../MiddleWare/verifyToken");
const { registerValidator, loginValidator } = require("../validators/user");


const router = express.Router();

// While creating a route, use noun not verb words 
router.get("/currentUser", authMiddleWare, currentUser);
router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);



module.exports = router;