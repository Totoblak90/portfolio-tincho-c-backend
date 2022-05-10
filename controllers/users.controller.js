const { User } = require("../Db/index.js");
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

    const passwordfinal = bcrypt.compareSync(
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
    next(err);
  }
};

const resetPassword = async (req, res, next) => {

    const { newPassword, oldPassword, username, token } = req.body;
  
    try {

      if (token === 'jsontokenguardado') {
          return next({
              status: 400,
              message: 'Token inválido'
          })
      }
  
      const user = await User.findOne({ where: { username } });
      if (!user) {
          return next({
            status: 400,
            message: "Este usuario no existe",
          });
        }
  
      const isMatch = await bcrypt.compare(oldPassword, user.dataValues.password);
  
      if (!isMatch) {
        return next({ status: 400, message: "Contraseña incorrecta" });
      }
  
      await User.update(
        { password: newPassword },
        { where: { username } }
      );
  
      res.status(200).json({
          message: 'Contraseña cambiada con éxito'
      })
  
    } catch (error) {
      next(error);
    }
}

module.exports = {
  login,
  resetPassword
};
