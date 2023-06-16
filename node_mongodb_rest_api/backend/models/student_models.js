const mongoose = require("mongoose");

const studentsSchema = mongoose.Schema(
  {
    Firstname: {
      type: String,
      required: [true, "Please enter your firstname!"],
    },
    Middlename: {
      type: String,
      required: [true, "Please enter your middlename!"],
    },
    Lastname: {
      type: String,
      required: [true, "Please enter your lastname!"],
    },
    Age: {
      type: Number,
      required: [true, "Please enter your age!"],
    },
    DateOfBirth: {
      type: String,
      required: [true, "Please enter your birthdate!"],
    },
    Course: {
      type: String,
      required: [true, "Please enter your course!"],
    },
  },
  {
    timestamps: true,
  }
);

const Students = mongoose.model("Students", studentsSchema);
module.exports = Students;
