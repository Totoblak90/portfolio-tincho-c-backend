// Importaciones

const {
  Galeria
} = require("../Db/index.js");
const fs = require('fs');

// Controllers

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

const deletePhoto = async (req, res) => {

  const {
    filename
  } = req.body

  if (!filename) {
    return res.status(404).json({
      message: 'Foto no encontrada'
    })
  }

  // Borro el archivo físico de la carpeta
  fs.unlinkSync(
    `public/gallery/${filename}`
  );

  // Borro el archivo de la base de datos

  const deletePhoto = await Galeria.destroy({
    where: {
      filename
    }
  });

  if (deletePhoto) {
    return res.status(200).json({
      message: 'Foto eliminada correctamente'
    })
  } else {
    return res.status(400).json({
      message: 'No se pudo eliminar la foto'
    })
  }

}

module.exports = {
  getPhotos,
  savePhoto,
  deletePhoto
};