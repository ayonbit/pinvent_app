//dpendencies
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, Please login first!");
    }

    //verfiy token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    //get UserID form token
    const user = await User.findById(verified.id).select("-password");

    //no user
    if (!user) {
      res.status(401);
      throw new Error("User Not Found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, Please login first!");
  }
});

module.exports = protect;
