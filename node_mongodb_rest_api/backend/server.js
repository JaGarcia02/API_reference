const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 8181;

// Imports From models dir
const StudentRouter = require("./routes/student_rotutes");

app.use(express.json());
app.use(cors());

app.use("/api/students", StudentRouter);

// database connection
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://tgarcia:qBKKvDeetBjnB9Wk@testcrud.zapjtej.mongodb.net/test"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log("Database connection: Success");
    });
  })
  .catch((error) => {
    console.log(error);
  });
