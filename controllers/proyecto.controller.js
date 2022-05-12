const {
  Proyecto
} = require("../Db/index.js");

const fs = require("fs");

const getProyects = async (req, res) => {
  let proyects = await Proyecto.findAll();


  if (!proyects || proyects.length === 0) {
    return res.status(400).send("No se encuentran proyectos");
  }

  const response = proyects.map(proyecto => {
    return {
      id: proyecto.dataValues.id,
      name: proyecto.dataValues.name,
      image: proyecto.dataValues.image,
    }
  })

  return res.status(200).json(response);
};

const getProyectById = async (req, res) => {
  const {
    id
  } = req.params;

  let proyect = await Proyecto.findByPk(id);

  if (!proyect) {
    res.status(400).send("No se encontró el proyecto");
  }
  res.status(200).json(proyect);
};

const saveProyect = async (req, res) => {
  let {
    name,
    proyect_date,
    description
  } = req.body;

  if (!name) {
    return res.status(400).send("No se pudo crear proyecto");
  }

  let image;
  if (req.file) {
    image = req.file.filename;
  }

  const nuevoProyecto = await Proyecto.create({
    name,
    image,
    proyect_date,
    description
  });

  if (nuevoProyecto) {
    return res.status(200).json({
      message: "Proyecto creado",
    });
  } else {
    return res.status(400).send("No se pudo crear proyecto");
  }
};

const deleteProyect = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    image
  } = req.body;

  if (!id) {
    return res.status(404).json({
      message: "Proyecto no encontrado",
    });
  }

  // Borro el archivo físico de la carpeta
  fs.unlinkSync(`public/proyect/${image}`);

  // Borro el archivo de la base de datos

  const deleteProyectPhoto = await Proyecto.destroy({
    where: {
      id,
    },
  });

  if (deleteProyectPhoto) {
    return res.status(200).json({
      message: "Proyecto eliminado correctamente",
    });
  } else {
    return res.status(400).json({
      message: "No se pudo eliminar el proyecto",
    });
  }
};

module.exports = {
  getProyects,
  getProyectById,
  saveProyect,
  deleteProyect,
};