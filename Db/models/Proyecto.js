const {
  DataTypes
} = require("sequelize");

module.exports = (sequelize) => {
  const Proyecto = sequelize.define("proyecto", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    proyect_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  Proyecto.associate = (models) => {
    Proyecto.hasMany(models.AssetProyecto, {
      as: "AssetProyecto",
      foreignKey: "proyecto_id",
    });
  };

};