require("dotenv").config();
const mongoose = require("mongoose");
const URI = process.env.DB_URL;
const connectDb = async()=>{
    try {
        await mongoose.connect(URI);
        console.log('connection successfull');
    } catch (error) {
        console.error(`database connection faild ${error}`);        
        process.exit(0);
    }
}
module.exports = connectDb;