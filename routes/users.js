var express = require("express");
var router = express.Router();
const auth = require("../uttilities/middlewareAuth");

// Controllers
const { login, resetPassword } = require("../controllers/users.controller");

/* GET users listing. */
router.post("/login", login);
router.post("/reset-password", auth, resetPassword);

module.exports = router;
