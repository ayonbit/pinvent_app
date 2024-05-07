//Dependencies
const mongoose = require("mongoose");




//user schema for mongoose 
const userSchema = mongoose.Schema({
  //userfiled
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email!",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a Password"],
    minlength: [6, "Password must be up to 6 char"],
    maxlenght: [23, "Password must not be more than 23 char"],
  },
  photo: {
    type: String,
    required: [true, "Please add a Photo"],
    //upload a default avatar,
    default: "APP",
  },
  phone: {
    type: String,
    required: [true, "Please add a number"],
    default: "+88",
  },
  phone: {
    type: String,
    maxlenght: [250, "Bio must not be more than 250 char"],
    default: "bio",
  },
},
{
    timestamps: true;
}

);

const User = mongoose.model("User", userSchema);


//moudle export
module.exports = User;
