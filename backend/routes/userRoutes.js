//Dependencies
const express = require("express");
const {
  registerUser,
  loginUser,
  logOut,
  getUser,
} = require("../controllers/userController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logOut);
router.get("/getuser",getUser);

module.exports = router;
