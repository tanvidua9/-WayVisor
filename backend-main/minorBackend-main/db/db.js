const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL);


const userSchema=new mongoose.Schema({

     email: {
          type: String,
          required: true,
          unique: true
        },
     password: {
         type: String,
         required: true
         },
         firstname: {
          type: String,
          required: true
        },
        lastname: {
          type: String,
          required: true
        }  
       , phone:{
          type:Number,
          required:true
        }  
});

const dataSchema=new mongoose.Schema({
     to:{
          type:String,
          required:true
     },
     from:{
          type:String,
          required:true
     },
     details:{
          type:String,
          required:true
     },
     date: {
          type: Date,
          default: Date.now
        }
});


const User=mongoose.model("User",userSchema);
const Data=mongoose.model("Data",dataSchema);

module.exports={
     User,
     Data
}






