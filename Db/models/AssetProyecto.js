const {
  DataTypes
} = require("sequelize");

module.exports = (sequelize) => {
  const AssetProyecto = sequelize.define("assetProyecto", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
  });

  AssetProyecto.associate = (models) => {
    AssetProyecto.belongsTo(models.Proyecto, {
      as: "Proyecto",
      foreignKey: "proyecto_id",
    });
  };
};