const express = require("express");
const router = express.Router();
const { create, view_data } = require("../controllers/rates_controllers");

router.post("/bulkCreate", create);
router.get("/get-all-data", view_data);

module.exports = router;
