//Dependencies
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//user schema for mongoose
const userSchema = mongoose.Schema(
  {
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
      // maxlenght: [23, "Password must not be more than 23 char"],
    },
    photo: {
      type: String,
      required: [true, "Please add a Photo"],
      //upload a default avatar,
      default: "https://ibb.co/x2L4cTj",
    },
    phone: {
      type: String,
      required: [true, "Please add a number"],
      default: "+88",
    },
    bio: {
      type: String,
      maxlenght: [250, "Bio must not be more than 250 char"],
      default: "bio",
    },
  },
  {
    timestamps: true,
  }
);
//encrypt pasword before save to db
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  // Hashed Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("User", userSchema);

//moudle export
module.exports = User;
