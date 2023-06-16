const express = require("express");
const router = express.Router();
const {
  Create_Student,
  View_Students,
  View_Students_By_ID,
  Update_Student,
  Delete_Student_By_ID,
} = require("../controllers/students_controllers");

router.get("/view-all-studets", View_Students);
router.get("/view-studet/:id", View_Students_By_ID);

router.post("/create-student", Create_Student);

router.put("/update-studet/:id", Update_Student);

router.delete("/delete-student/:id", Delete_Student_By_ID);

module.exports = router;
