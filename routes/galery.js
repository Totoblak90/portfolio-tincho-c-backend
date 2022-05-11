var express = require("express");
var router = express.Router();
const auth = require("../uttilities/middlewareAuth");

const { getPhotos } = require("../controllers/galeria.controller");

router.get("/", getPhotos);

module.exports = router;
