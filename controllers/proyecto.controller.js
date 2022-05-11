const { Proyecto } = require("../Db/index.js");
const fs = require("fs");

const getProyects = async (req, res) => {
  let proyects = await Proyecto.findAll();
  if (!proyects || proyects.length === 0) {
    res.status(400).send("No se encuentran proyectos");
  }
  res.status(200).json(proyects);
};

const saveProyect = async (req, res) => {
  const { name, image } = req.body;

  if (!name) {
    return res.status(400).send("No se pudo crear proyecto");
  }
  const nuevoProyecto = await Proyecto.create({
    name,
    image,
  });
  if (nuevoProyecto) {
    return res.status(200).json({ message: "Proyecto creado" });
  } else {
    return res.status(400).send("No se pudo crear proyecto");
  }
};

module.exports = {
  getProyects,
  saveProyect,
};
