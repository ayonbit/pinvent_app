//Dependencies
const express = require("express");
const { registerUser, loginUSer } = require("../controllers/userController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUSer);

module.exports = router;
