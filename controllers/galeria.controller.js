// Importaciones

const {
  Galeria
} = require("../Db/index.js");
const fs = require("fs");

// Controllers

const getPhotos = async (req, res) => {
  let photos = await Galeria.findAll();
  if (!photos || photos.length === 0) {
    return res.status(400).json({status: 400, message: "No se encontró ninguna foto"})
  }
  return res.status(200).json(photos);
};

const savePhoto = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      error: "No se encontró una imágen",
      status: 400
    });
  }

  const {
    filename
  } = req.file;

  const saveFile = await Galeria.create({
    filename,
  });

  if (saveFile) {
    return res.send("Imagen guardada correctamente")
  } else {
    return res.status(400).json({
      message: "No se pudo guardar la imágen",
      status: 400
    });
  }
};

const deletePhoto = async (req, res) => {
  const {
    filename
  } = req.body;

  if (!filename) {
    return res.status(404).json({
      message: "Foto no encontrada",
      status: 404
    });
  }

  // Borro el archivo de la base de datos

  const deletePhoto = await Galeria.destroy({
    where: {
      filename,
    },
  });

  if (deletePhoto) {
    // Borro el archivo físico de la carpeta
    if (fs.existsSync(`public/gallery/${filename}`)) {
      fs.unlinkSync(`public/gallery/${filename}`);
    }

    return res.status(200).send("Foto eliminada correctamente")
  } else {
    return res.status(400).json({
      message: "No se pudo eliminar la foto",
      status: 400
    });
  }
};

module.exports = {
  getPhotos,
  savePhoto,
  deletePhoto,
};