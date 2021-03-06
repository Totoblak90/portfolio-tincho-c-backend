var express = require("express");
var router = express.Router();
const auth = require("../utilities/middlewareAuth");

// Controllers
const {
    login,
    resetPassword
} = require("../controllers/users.controller");

/* GET users listing. */
router.post("/login", login);
router.put("/reset-password", auth, resetPassword);

module.exports = router;