const {
  Galeria
} = require("../Db/index.js");

const getPhotos = async (req, res) => {
  let photos = await Galeria.findAll();
  if (!photos || photos.length === 0) {
    res.status(400).send("No se encuentran fotos");
  }
  res.status(200).json(photos);
};

const savePhoto = async (req, res) => {

  if (!req.file) {
    return res.status(400).json({
      error: "No se encontró una imágen"
    })
  }

  const {
    filename
  } = req.file

  const saveFile = await Galeria.create({
    filename
  })

  if (saveFile) {
    return res.json({
      message: "Imagen guardada correctamente"
    })
  } else {
    res.status(400).json({
      message: "No se pudo guardar la imágen"
    })
  }

}

module.exports = {
  getPhotos,
  savePhoto
};