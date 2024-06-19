//Dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const userRoute = require("./routes/userRoutes");
const errorHandler = require("./middleWare/errorMiddleWare");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

//app
const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("tiny"));
//Routes Middlewares
app.use("/api/users", userRoute);
//routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

//port
const PORT = process.env.PORT;

//Error Middle Ware
app.use(errorHandler);

//connect to db and start server
//connect db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected Successfully!"))
  .catch((err) => console.log("Database Not Connected", err));

//start server
app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
