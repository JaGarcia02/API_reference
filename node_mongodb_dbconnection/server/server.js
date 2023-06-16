const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 4500;

// database
const database = (module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(
      "mongodb+srv://tgarcia:CPBwI1wVufZyzNgM@test.fmugzxh.mongodb.net/test",
      connectionParams
    );
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
});

database();

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
