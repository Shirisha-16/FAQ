const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()
const DBconnection = async()=>{
    const MONGODB_URI = process.env.MONGO_URI;
    try{
       await mongoose.connect(MONGODB_URI,{useNewUrlParser : true, useUnifiedTopology: true})
       console.log("database connected");
    }   
    catch(error){
        console.log("Error connecting to mongodb" +error);
    }
}
module.exports = {DBconnection};