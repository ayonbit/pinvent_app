//Dependencies
const asyncHandler = require("express-async-handler");

//Login user
const loginUSer = asyncHandler(async (req, res) => {
  res.send("Login User");
});
//module exports
module.exports = loginUSer;
