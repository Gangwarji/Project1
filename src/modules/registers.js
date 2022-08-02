const mongoose = require("mongoose");
const validator = require("validator");

const EmployeSchema = new mongoose.Schema({
    Email: {
        type:String,
        require:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email address")
            }
        }
    },
    name:{
        type:String,
        require:true,
        minLength:3
    },
    username:{
        type:String,
        require:true,
        minLength:5
    },
    phone:{
        type:Number,
        require:true,
        min:10
    },
    date:{
        type:Date,
        default:Date.now()

    }

});
 
// creating a Collection

const register = new mongoose.model("Register", EmployeSchema);

module.exports = register;