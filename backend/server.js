//Dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const userRoute = require("./routes/userRoutes");
const errorHandler = require("./middleWare/errorMiddleWare");
const cookieParser = require("cookie-parser");

//app
const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Routes Middlewares
app.use("/api/users", userRoute);
//routes
app.get("/", (req, res) => {
  res.send("Home Page");
});
app.get("/api/users/register", (req, res) => {
  res.send("Register User");
});
// app.get("/api/users/login", (req, res) => {
//   res.send("Login User");
// });

//port
const PORT = process.env.PORT;

//Error Middle Ware
app.use(errorHandler);

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
