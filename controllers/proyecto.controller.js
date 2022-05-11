const {
  Proyecto,
  AssetProyecto
} = require("../Db/index.js");

const fs = require("fs");

const getProyects = async (req, res) => {

  let proyects = await Proyecto.findAll();

  if (!proyects || proyects.length === 0) {
    res.status(400).send("No se encuentran proyectos");
  }
  res.status(200).json(proyects);

};

const saveProyect = async (req, res) => {
  let {
    name,
    assetsProyecto
  } = req.body;

  if (!name) {
    return res.status(400).send("No se pudo crear proyecto");
  }

  let image;
  if (req.file) {
    image = req.file.filename
  }

  const nuevoProyecto = await Proyecto.create({
    name,
    image
  });


  if (assetsProyecto.length) {

    assetsProyecto = assetsProyecto.map((a, i) => {
      return {
        ...assetsProyecto[i],
        proyecto_id: nuevoProyecto.dataValues.id
      }
    })

    const agregoAssetsAlProyecto = await Promise.all(
      assetsProyecto.map(async (asset) => {
        return await AssetProyecto.findOrCreate({
          where: {
            name: asset.name
          }
        })
      })
    )

    if (agregoAssetsAlProyecto) {
      return res.status(200).json({
        message: "Proyecto con sus imágenes guardado correctamente"
      })
    } else {
      return res.status(404).json({
        message: "Error al querer guardar el proyecto, intentalo nuevamente"
      })
    }
  } else {
    if (nuevoProyecto) {
      return res.status(200).json({
        message: "Proyecto creado"
      });
    } else {
      return res.status(400).send("No se pudo crear proyecto");
    }
  }


};

module.exports = {
  getProyects,
  saveProyect,
};