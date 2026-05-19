const nodemailer = require("nodemailer");
const envObj = require("../config/env");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: envObj.appEmail,
        pass: envObj.appPassword,
    },
})

const verifyTransport = async () => {
    try {
        await transporter.verify();
        console.log("Server is ready to take our messages");


    } catch (error) {
        console.log("Verification failed:", error);
    }
};




// Function/Code to send an email through the transporter/backend
const sendMail = async () => {
    try {
        const info = await transporter.sendMail({
            from: envObj.appEmail,   //sender address
            to: "husinatazeez07@gmail.com",  //list of receivers. Could be a string or an array of strings,
            subject: "Hello from nodemailer", //subject of the email
            text: "This is a test email sent using nodemailer", //plain text body
            html: "<p>This is a test email sent using nodemailer</p>"  //HTML body content. Can be used to send rich content like images, links, etc.
        });

        console.log("Message sent: %s", info.messageId);
        // Preview URL is only available when using an Ethereal test account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));



    } catch (err) {
        console.error("Error while sending mail:", err);
    }
};





// SENDING A WELCOMING EMAIL TO THE USER AFTER REGISTRATION
const sendWelcomingEmail = async (email, name) => {

    try {
        const info = await transporter.sendMail({
            from: envObj.appEmail,
            to: email,
            subject: "Welcome to our Platform",
            html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Onboard!</title>
    <style>
        body { margin: 0; padding: 0; background-color: #f6f9fc; font-family: sans-serif; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .card { background-color: #ffffff; padding: 40px; border-radius: 8px; border: 1px solid #e2e8f0; }
        .btn { background: #4f46e5; color: #ffffff !important; text-decoration: none; padding: 12px 25px; border-radius: 6px; display: inline-block; font-weight: bold; }
        .footer { text-align: center; font-size: 12px; color: #a0aec0; padding: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h1 style="color: #1a202c; font-size: 24px;">Welcome to the community! 🎉</h1>
            <p style="color: #4a5568; font-size: 16px; line-height: 24px;">Hi ${name},</p>
            <p style="color: #4a5568; font-size: 16px; line-height: 24px;">We are absolutely thrilled to have you here. Your account is officially set up and ready to go.</p>
            <p style="margin: 30px 0;"><a href="{{action_url}}" class="btn">Get Started Now</a></p>
            <hr style="border: 0; border-top: 1px solid #edf2f7; margin: 20px 0;">
            <p style="color: #718096; font-size: 14px;">Cheers,<br><strong>The Team</strong></p>
        </div>
        <div class="footer">
            <p>123 Business Rd, Suite 100, San Francisco, CA 94103</p>
            <p><a href="#" style="color: #4f46e5;">Unsubscribe</a></p>
        </div>
    </div>
</body>
</html>`,
        });
        console.log("Message sent: %s", info.messageId);

    } catch (error) {
        console.log("Error sending welcome email:", error);
    }

};



// SENDING A VERIFICATION EMAIL PLUS OTP AFTER REGISTRATION
const sendEmailOtp = async (name, email, otp) => {

    try {
        const info = await transporter.sendMail({
            from: envObj.appEmail,
            to: email,
            subject: "Your Verification OTP Code!",
            text: `Your OTP is: ${otp}. It will be used to verify your account.`,
            html: ` 
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px 20px;">
  
  <div style="max-width: 500px; margin: auto; background: white; border-radius: 10px; padding: 40px; text-align: center; border: 1px solid #e5e7eb;">

    <h2 style="color: #111827; margin-bottom: 10px;">
      Verify Your Account
    </h2>

    <p style="color: #4b5563; font-size: 16px;">
      Hello ${name} 👋
    </p>

    <p style="color: #6b7280; font-size: 15px; line-height: 24px;">
      Use the verification code below to complete your registration.
    </p>

    <div style="margin: 30px 0;">
      <span style="
        display: inline-block;
        background-color: #4f46e5;
        color: white;
        padding: 15px 35px;
        font-size: 28px;
        font-weight: bold;
        border-radius: 8px;
        letter-spacing: 5px;
      ">
        ${otp}
      </span>
    </div>

    <p style="color: #9ca3af; font-size: 14px;">
      If you did not create an account, you can safely ignore this email.
    </p>

  </div>
</div>
            `

        });
        console.log(email);
        console.log(otp);


        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));



    } catch (error) {
        console.error("Error sending OTP email:", error);
    }
};






module.exports = { verifyTransport, sendMail, sendWelcomingEmail, sendEmailOtp };