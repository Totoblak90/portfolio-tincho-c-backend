const User = require("../Db/index.js");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next({
      status: 400,
      message: "Se requiere un usuario o contraseña valido",
    });
  }
  let user = await User.findOne({ where: { username } });

  if (!user) {
    return next({
      status: 400,
      message: "Este usuario no existe",
    });
  }
  const passwordfinal = await bcrypt.compareSync(
    password,
    user.dataValues.password
  );

  if (!passwordfinal) {
    return next({
      status: 400,
      message: "Contraseña invalida",
    });
  }
};

module.exports = {
  login,
};
