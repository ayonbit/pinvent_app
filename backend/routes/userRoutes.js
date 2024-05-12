//Dependencies
const express = require("express");
const {
  registerUser,
  loginUser,
  logOut,
  getUser,
  loginSatatus,
} = require("../controllers/userController");
const protect = require("../middleWare/authMiddleware");
const router = express.Router();

//routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logOut);
router.get("/getuser", protect, getUser);
router.get("/loggein", loginSatatus);

module.exports = router;
