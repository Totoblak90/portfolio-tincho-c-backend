const { Galeria } = require("../Db/index.js");

const getPhotos = async (req, res) => {
  let photos = await Galeria.findAll();
  if (!photos || photos.length === 0) {
    res.status(400).send("No se encuentran fotos");
  }
  res.status(200).json(photos);
};

module.exports = {
  getPhotos,
};
