const {
  Proyecto,
  AssetProyecto
} = require("../Db/index.js");

const fs = require("fs");

const getProyects = async (req, res) => {
  let proyects = await Proyecto.findAll();

  if (!proyects || proyects.length === 0) {
    return res.status(400).send("No se encuentran proyectos");
  }

  const response = proyects.map((proyecto) => {
    return {
      id: proyecto.dataValues.id,
      name: proyecto.dataValues.name,
      image: proyecto.dataValues.image,
    };
  });

  return res.status(200).json(response);
};

const getProyectById = async (req, res) => {
  const {
    id
  } = req.params;

  let proyect = await Proyecto.findByPk(id, {
    include: [{
      association: "AssetProyecto",
    }],
  });

  if (!proyect) {
    return res.status(400).send("No se encontró el proyecto");
  }
  return res.status(200).json(proyect);
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
    description,
  });

  if (nuevoProyecto) {
    return res.status(200).json({
      message: "Proyecto creado",
    });
  } else {
    return res.status(400).send("No se pudo crear proyecto");
  }
};

const editProyect = async (req, res) => {
  const {
    id
  } = req.params;

  const {
    oldFilename,
    name,
    description
  } = req.body;

  const {
    filename
  } = req.file;

  const proyecto = await Proyecto.findByPk(id);

  if (proyecto) {
    try {
      // Actualizo el proyecto
      const editoProyecto = await Proyecto.update({
        name,
        description,
        image: filename,
      }, {
        where: {
          id,
        },
      });

      if (editoProyecto) {
        // Borro la foto vieja
        if (fs.existsSync(`public/proyect/${oldFilename}`)) {
          fs.unlinkSync(`public/proyect/${oldFilename}`);
        }

        return res.status(200).json({
          mensaje: "Proyecto actualizado correctamente",
        });
      } else {
        return res.status(500).json({
          mensaje: "No se pudo actualizar el proyecto, por favor intentalo nuevamente",
          error,
        });
      }
    } catch (error) {
      return res.status(500).json({
        mensaje: "No se pudo actualizar el proyecto, por favor intentalo nuevamente",
        error,
      });
    }
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

  // Borro el archivo de la base de datos

  const proyectoConAsociacion = await Proyecto.findByPk(id, {
    include: [{
      association: "AssetProyecto",
    }],
  });

  const deleteProyectPhoto = await Proyecto.destroy({
    where: {
      id,
    },
  });

  if (deleteProyectPhoto) {
    // Borro el archivo físico de la carpeta
    if (fs.existsSync(`public/proyect/${image}`)) {
      fs.unlinkSync(`public/proyect/${image}`);
    }

    if (proyectoConAsociacion.dataValues.AssetProyecto && proyectoConAsociacion.dataValues.AssetProyecto.length > 0) {
      const promesas = proyectoConAsociacion.dataValues.AssetProyecto.map(asset => AssetProyecto.destroy({
        where: {
          id: asset.id
        }
      }))
      const borroAssetDb = await Promise.all(promesas);

      if (borroAssetDb && borroAssetDb.length > 0) {
        proyectoConAsociacion.dataValues.AssetProyecto.forEach(asset => {
          if (fs.existsSync(`public/assets-proyectos/${asset.filename}`)) {
            fs.unlinkSync(`public/assets-proyectos/${asset.filename}`)
          }
        })
      } else {
        return res.status(200).json({
          message: "Proyecto eliminado correctamente pero no sus imágenes",
        });
      }

    }

    return res.status(200).json({
      message: "Proyecto eliminado correctamente con sus imágenes correspondientes",
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
  editProyect,
  deleteProyect,
};