//dpendenciress after "express-async-handler bcrypt"
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//create tokken
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

//RegisterUser Controller
const registerUser = asyncHandler(async (req, res) => {
  //for test purpose async
  // if (!req.body.email) {
  //   res.status(400);
  //   throw new Error("Please add an email");
  // }
  // res.send("Register User");

  //form construction
  const { name, email, password } = req.body;
  //validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in required fields");
  }
  if (password.lenght < 6) {
    res.status(400);
    throw new Error("Password must be up to 6 char");
  }

  //check if the user email already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email has already been registered");
  }

  //create newUSer
  const user = await User.create({
    name,
    email,
    password,
  });

  //Generate Token
  const token = generateToken(user._id);

  //send HTTP-cookie Only
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    //only for deploy
    // sameSite:"none",
    // secure:true
  });

  if (user) {
    const { _id, name, email, photo, phone, bio } = user;

    res.status(200).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});
//LoginUser Contoller
const loginUser = asyncHandler(async (req, res) => {
  //res.send("Login User"); //test
  const { email, password } = req.body;

  //validate Request
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add email and password");
  }

  //check if user exist
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User not found Please signup");
  }

  //if user exists,check if password is correct
  const passwordCorrect = await bcrypt.compare(password, user.password);

  //Generate Token
  const token = generateToken(user._id);

  //send HTTP-cookie Only
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    //only for deploy
    sameSite: "none",
    secure: true,
  });

  if (user && passwordCorrect) {
    const { _id, name, email, photo, phone, bio } = user;

    res.status(200).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});
//controller module exprots as many
module.exports = {
  registerUser,
  loginUser,
};
