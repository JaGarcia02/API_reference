const { SSS_models } = require("../models");

const create = async (req, res) => {
  const { data } = req.body;
  try {
    const Insert_Data = await SSS_models.bulkCreate(data);
    return res.status(200).json(Insert_Data);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

const view_data = async (req, res) => {
  try {
    const All_Data = await SSS_models.findAll();
    return res.status(200).json(All_Data);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

module.exports = { create, view_data };
