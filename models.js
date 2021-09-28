const mongoose = require('mongoose');

// // Create Schema named UserSchema using Function : mongoose.Schema()...
const UserSchema = new mongoose.Schema({
    username:{
        type : String,
        required: true
    },
    phone:{
        type:String,
        default:0
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
    }
});

// // Create variable User which will contain the name of model
// // and schema of that model.
module.exports = mongoose.model("User", UserSchema);
// // Export this variable to access it in routes.js
