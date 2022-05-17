const {
  User
} = require("../Db/index.js");
const jwt = require("jsonwebtoken");
const {
  JWT_SECRET
} = process.env;
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
  const {
    username,
    password
  } = req.body;

  if (!username || !password) {
    return next({
      status: 400,
      message: "Se requiere un usuario o contraseña valido",
    });
  }

  try {
    let user = await User.findOne({
      where: {
        username
      }
    });

    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "Este usuario no existe",
      });
    }

    const passwordfinal = bcrypt.compareSync(
      password,
      user.dataValues.password
    );

    if (!passwordfinal) {
      return res.status(400).json({
        status: 400,
        message: "Contraseña invalida",
      });
    }

    const payload = {
      user: {
        id: user.id
      },
    };

    jwt.sign(
      payload,
      JWT_SECRET, {
        expiresIn: "1500d",
      },
      (err, token) => {
        if (err) throw err;
        return res.status(200).json({
          token
        });
      }
    );
  } catch (err) {
    res.status(500).json({
      message: "Error al intentar conectar a la base de datos. Por favor, ponte en contacto con el administrador",
      error: err,
      status: 500,
    });
  }
};

const resetPassword = async (req, res, next) => {
  const {
    newPassword,
    oldPassword,
    username
  } = req.body;

  if (newPassword === oldPassword) {
    return res.status(403).json({status: 403, message: "Las contraseñas deben ser diferentes"})
  }


  try {
    const user = await User.findOne({
      where: {
        username
      }
    });
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "Este usuario no existe",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.dataValues.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({
          status: 400,
          message: "Contraseña incorrecta"
        });
    }

    await User.update({
      password: newPassword
    }, {
      where: {
        username
      }
    });

    res.status(200).send("Contraseña cambiada con éxito");
  } catch (error) {
    res.status(500).json({
      message: "Error al intentar conectar a la base de datos. Por favor, ponte en contacto con el administrador",
      status: 500,
    });
  }
};

module.exports = {
  login,
  resetPassword,
};