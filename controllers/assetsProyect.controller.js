const {
  AssetProyecto
} = require("../Db/index.js");

const fs = require("fs");

const getAssets = async (req, res) => {
  const {
    id
  } = req.params;

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
  const {
    id
  } = req.params;
  let filenames;

  if (req.files && req.files.length > 0) {
    filenames = req.files;

    const nuevoAsset = filenames.map((file) =>
      AssetProyecto.create({
        proyecto_id: id,
        filename: file.filename,
      })
    );

    const assetCreado = await Promise.all(nuevoAsset);

    if (assetCreado && assetCreado.length > 0) {
      return res.status(200).send("Tus imagenes se guardaron correctamente");
    } else {
      return res.status(400).send("No se pudieron guardar las imagenes");
    }

  } else {
    return res.status(400).send("No se subió ninguna imágen");
  }


};

const deleteAssets = async (req, res) => {
  if (!req.body.assets) {
    return res.status(500).send("Error al querer borrar las imágenes")
  }

  const {
    assets
  } = req.body;

  if (assets.length < 1) {
    return res.status(500).send("Error al querer borrar las imágenes")
  }

  const promises = assets.map(asset => AssetProyecto.destroy({
    where: {
      id: asset.id
    }
  }))

  const borroAssetsDB = await Promise.all(promises)

  if (borroAssetsDB && borroAssetsDB.length > 0) {
    assets.forEach(asset => {
      if (fs.existsSync(`public/assets-proyectos/${asset.filename}`)) {
        fs.unlinkSync(`public/assets-proyectos/${asset.filename}`)
      }
    })

    return res.status(200).send("Imagenes borradas correctamente")
  } else {
    return res.status(500).send("No se pudieron borrar las imágenes")
  }
}

module.exports = {
  getAssets,
  saveAsset,
  deleteAssets
};