const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { User } = require("../Db/index");

module.exports = async (req, res, next) => {
  // el token viene en el header de la petición, lo tomamos:
  const token = req.header("Authorization");

  // Si no nos han proporcionado un token lanzamos un error
  if (!token) {
    return res.status(403).json({ status: 403, message: "Token not found" });
  }

  try {
      const decoded = jwt.verify(token, JWT_SECRET);
      let user = await User.findByPk(decoded.user.id);
  
        // ningún usuario contiene ese correo
        if (!user) return next({ status: 400, message: "No hay un usuario registrado con esa contraseña" });
  
        req.user = user.dataValues;
  
        next();
    } catch (error) {
      res.sendStatus(403).json({
        status: 403,
        mensaje: 'Token inválido'
      });
    }
};
