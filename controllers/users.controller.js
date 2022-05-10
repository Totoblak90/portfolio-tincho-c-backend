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
  try {
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
    const payload = {
      user: { id: user.id },
    };
    jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: "1500d",
      },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (err) {
    // console.log(err)
    next(err);
  }
};

module.exports = {
  login,
};
