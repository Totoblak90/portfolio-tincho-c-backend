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
  let filenames;
  if (req.files && req.files.length === 0) {
    filenames = req.files;
  }
  const nuevoAsset = filenames.map((file) =>
    AssetProyecto.create({
      proyecto_id: id,
      filename: file.filename,
    })
  );
  const assetCreado = await Promise.all(nuevoAsset);
  console.log(assetCreado);
  if (assetCreado) {
    return res.status(200).send("Tus imagenes se guardaron correctamente");
  } else {
    return res.status(400).send("No se pudieron guardar las imagenes");
  }
};

module.exports = {
  getAssets,
  saveAsset,
};
