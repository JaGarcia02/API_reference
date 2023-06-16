const Studets_Database = require("../models/student_models");

const Create_Student = async (req, res) => {
  try {
    const create = await Studets_Database.create(req.body);
    return res.status(200).json(create);
  } catch (error) {
    res.status(500).json({ messege: error.messege });
    throw new Error(error);
  }
};

const View_Students = async (req, res) => {
  try {
    const view = await Studets_Database.find({});
    return res.status(200).json(view);
  } catch (error) {
    res.status(500).json({ messege: error.messege });
    throw new Error(error);
  }
};

const View_Students_By_ID = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Studets_Database.findById(id);
    return res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ messege: error.messege });
    throw new Error(error);
  }
};

const Update_Student = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Studets_Database.findByIdAndUpdate(id, req.body);
    const updated_data = await Studets_Database.findById(id);
    if (!student) {
      return res
        .status(404)
        .json({ messege: `Cannot find any student id with ${id}` });
    } else {
      return res.status(200).json(updated_data);
    }
  } catch (error) {
    res.status(500).json({ messege: error.messege });
    throw new Error(error);
  }
};

const Delete_Student_By_ID = async (req, res) => {
  const { id } = req.params;
  try {
    const delete_student = await Studets_Database.findByIdAndDelete(id);
    const updated_data = await Studets_Database.find({});
    if (!delete_student) {
      return res.status(404).json({
        messege: `Cannot delete, id: ${id} is not existing in the database!`,
      });
    } else {
      return res.status(200).json({ messege: "Student has been removed!" });
    }
  } catch (error) {
    res.status(500).json({ messege: error.messege });
    throw new Error(error);
  }
};

module.exports = {
  Create_Student,
  View_Students,
  View_Students_By_ID,
  Update_Student,
  Delete_Student_By_ID,
};
