var express = require("express");
const { verifyToken } = require("../controllers/verifyToken.controller");
var router = express.Router();


router.post("/", verifyToken);

module.exports = router;