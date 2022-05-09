const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Galeria = sequelize.define("galeria", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
