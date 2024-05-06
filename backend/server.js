//Dependencires
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();

//app
const app = express();

//port
const PORT = process.env.PORT;

//connect to db and start server
//connect db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //start server
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
