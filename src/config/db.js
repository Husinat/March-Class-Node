const mongoose = require('mongoose');
const envObj = require ("./env")



const connectDb = async () => {
    try {
       const connect = await mongoose.connect(envObj.mongodbURL, {
       });

       if (connect){
       console.log('MongoDb connected');
       
       }
    } catch (error) {
     console.log(error);
    }
};
module.exports = connectDb;







//  mongodb+srv://abiodunhusinat_db_user:ok6IzjqPkKkEvQHg@first-database-class.yyhqyu6.mongodb.net/?appName=first-database-class