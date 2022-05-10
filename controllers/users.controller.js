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

const resetPassword = async (req, res, next) => {
  const { newPassword, oldPassword } = req.body;

  try {
    const user = await User.findByPk(req.user.id);
    const isMatch = await bcrypt.compare(oldPassword, user.dataValues.password);

    if (!isMatch) {
      return next({ status: 400, message: "Invalid old password" });
    }

    await User.update(
      { password: newPassword },
      { where: { email: user.dataValues.email } }
    );

    res.end();
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { name, lastname, country, photo, account_number, email } =
    req.body.data;

  const newInfo = {};

  if (name) newInfo.name = name;
  if (lastname) newInfo.lastname = lastname;
  if (country) newInfo.country = country;
  if (photo) newInfo.photo = photo;
  if (account_number) newInfo.account_number = account_number;
  if (email) newInfo.email = email;

  try {
    await User.update(newInfo, { where: { id: req.user.id } }).then((resp) => {
      res.send("Update successful");
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
