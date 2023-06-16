const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const UserRoutes = require("./routes/user_routes");
const PORT = 9999;
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/user", UserRoutes);

mongoose
  .connect(
    "mongodb+srv://tgarcia:qBKKvDeetBjnB9Wk@testcrud.zapjtej.mongodb.net/test"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
    console.log("Database Status: Connected!");
  })
  .catch((error) => {
    console.log(error);
    console.log("Database Status: Error!");
  });
