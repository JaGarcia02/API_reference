module.exports = (sequelize, DataTypes) => {
  const SSS_models = sequelize.define("SSS_models", {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ID_SSS: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    From: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    To: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    ProvidenFund: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    MonthSalary: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    ER: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    EE: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    Total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    Final_EC: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    Provident_ER: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    Provident_EE: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    Final_ER: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    Final_EE: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    Final_Total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    EffectivityDate: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  });
  return SSS_models;
};
