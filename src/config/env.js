const dotenv = require("dotenv");
dotenv.config();

const envObj = {
    port: process.env.PORT,
    mongodbURL: process.env.MONGODB_URL,
    jwtSecretKey: process.env.JWT_SECRET,
    jwtExpires: process.env.JWT_EXPIRES_IN,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
    appPassword: process.env.APP_PASSWORD,
    appEmail: process.env.APP_EMAIL

}

console.log(envObj.cloudinaryApiKey, envObj.cloudinaryApiSecret);


module.exports = envObj;