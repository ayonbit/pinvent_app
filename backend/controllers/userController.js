//dpendencies
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

//LoginUser Controller
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
    //sameSite: "none",
    //secure: true,
  });

  if (user && passwordCorrect) {
    const { _id, name, email, photo, phone, bio } = user;

    res.status(201).json({
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

//Logout User Controller
const logOut = asyncHandler(async (req, res) => {
  //send HTTP-cookie Only
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    //only for deploy
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({
    message: "Successfully Logged Out",
  });
});

//Get User Data / GetUser Controller
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  //user Found
  if (user) {
    const { _id, name, email, photo, phone, bio } = user;

    res.status(200).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
    });
  } else {
    res.status(400);
    throw new Error("User Not Found!");
  }
});

//Get Loging Status

const loginSatatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  //if token exists
  //verfiy token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});

//Update User
const UpdateUser = asyncHandler(async (req, res) => {
  res.send("User Updated");
});

//controller module exprots as many
module.exports = {
  registerUser,
  loginUser,
  logOut,
  getUser,
  loginSatatus,
  UpdateUser,
};
