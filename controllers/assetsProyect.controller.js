const { AssetProyecto } = require("../Db/index.js");

const fs = require("fs");

const getAssets = async (req, res) => {
  const { id } = req.params;

  const assetId = await AssetProyecto.findAll({
    where: {
      proyecto_id: id,
    },
  });
  if (!assetId || assetId.length === 0) {
    return res
      .status(400)
      .send(
        "No se encontraron imagenes pertenecientes al proyecto solicitado."
      );
  }
  res.status(200).json(assetId);
};

const saveAsset = async (req, res) => {
  const { id } = req.params;
  let filename;
  if (req.file) {
    filename = req.file.filename;
  }
  const nuevo
};

module.exports = {
  getAssets,
  saveAsset,
};
