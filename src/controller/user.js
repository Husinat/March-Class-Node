const User = require("../models/user");
const bcrypt = require("bcrypt");
const envObj = require("../config/env");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { sendWelcomingEmail, sendEmailOtp,  } = require("../utils/email");



const register = async (req, res) => {
  const errors = validationResult(req);
  // check if there's an error in the validation result
  if (!errors.isEmpty()){
  //  respond with a 400 status and the list of errors
  return res.status(400).json({ errors: errors.array()?.[0].msg });
  }

  const { name, email, password, age, gender } = req.body;

  try {
    if (!name || !email || !password || !age || !gender) {
      return res
        .status(402)
        .json({ status: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      return res
        .status(400)
        .json({ status: false, message: "User Already Exits" });
    }



    // HASHING THE PASSWORD
    const salt = 12;

    const hashedPassword = bcrypt.hashSync(password, salt);

    console.log(hashedPassword);

    

    
    // GENERATING OTP FOR USER VERIFICATION
    const otp = Math.floor(10000 + Math.random() * 900000);
    console.log("OTP:", otp)
    

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      age,
      gender,
      verificationOtp: otp,
    });

    console.log(newUser);
  

 await newUser.save();

await sendWelcomingEmail(email, name);

await sendEmailOtp(name, email, otp);

    return res
      .status(200)
      .json({ status: true, message: "Account created succefully" });

    // console.log(existingUser, "user");

    // console.log("succeful");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, status: false });
  }
};
console.log("REGISTER ROUTE HIT");




// OTP VERIFICATION
const verifyOtp = async (req, res) => {

  try {
    const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      status: false,
      message: "User not found"
    });
  }

  console.log("DB OTP:", user.verificationOtp);
console.log("INPUT OTP:", otp);



  // VERIFY OTP
  if (String(user.verificationOtp) !== String(otp)) {
    return res.status(400).json({
      status: false,
      message: "Invalid OTP"
    });
  }

  // IF OTP IS CORRECT
  user.isVerify = true;

  user.verificationOtp = null;

  await user.save();

  return res.status(200).json({
    status: true,
    message: "Account verified successfully"
  });
  }  catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Server error"
    });
  }
};




// RESEND OTP FUNCTION
const resendOtp =  async (req, res) => {

  try {
     const { email } = req.body;
 const user =  await User.findOne({ email })

    if (!user){
     return res.status(400).json({status: false,message: "User not found"
   });
      }

      if (user.isVerify) {
   return res.status(400).json({
      status: false,
      message: "User already verified"
   });
}

const newOtp = Math.floor(10000 + Math.random() * 900000);
user.verificationOtp = newOtp;
await user.save();
await sendEmailOtp(user.name, user.email, newOtp);

return res.status(200).json({
   status: true,
   message: "OTP sent successfully"
});
 

  } catch (error) {
    
  }
}










// LOGIN VERIFICATION
const login = async (req, res) => {
  const errors = validationResult(req);

  // check if there's an error in the validation system
  if (!errors.isEmpty()){

    //  Respond with a 400 status and the list of errors
    return res.status(400).json({ errors: errors.array()?.[0].msg });
  }


  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(402)
        .json({ status: false, message: "All fields is required" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credential" });
    }  


    const verifyPassword = await bcrypt.compare(
      password,
      existingUser.password,
    );
    console.log(verifyPassword);
    if (!verifyPassword) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credential" });
    }
    


     // CHECKING IF OTP IS VERIFIFIED BEFORE PROCEEDING
  if (!existingUser.isVerify){
   return res.status(400).json({
      status: false,
      message: "Account not verified. Please verify your email."
   });
}


      const token = jwt.sign({userId: existingUser._id}, envObj.jwtSecretKey, {expiresIn: envObj.jwtExpires})

    res.status(200).json({ status: true, message: "Login Succefully", token, user: existingUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, status: false });
  }
};


// Checking if a user exist

const currentUser = async (req, res) => {
  const userId = req.user.userId
           
  console.log(userId, "userId");


  if (!userId) {
    return res.status(404).json(null)
  }

  const user = await User.findById(userId).select("-password");
  res.json(user);
}

module.exports = {register, verifyOtp, login, currentUser, resendOtp};




// Resend Otp
// Verify Otp