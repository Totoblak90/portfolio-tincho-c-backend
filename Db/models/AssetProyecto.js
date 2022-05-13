const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const AssetProyecto = sequelize.define("assetProyecto", {
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

  AssetProyecto.associate = (models) => {
    AssetProyecto.belongsTo(models.Proyecto, {
      as: "Proyecto",
      foreignKey: "proyecto_id",
    });
  };
};
