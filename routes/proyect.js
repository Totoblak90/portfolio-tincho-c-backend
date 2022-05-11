var express = require("express");
var router = express.Router();
const auth = require("../uttilities/middlewareAuth");
var path = require("path");
const multer = require("multer");

// Multer

const fileFilter = (req, file, cb) => {
  const validFormats = [".jpg", ".jpeg", ".png"];
  if (!validFormats.includes(path.extname(file.originalname.toLowerCase()))) {
    return cb(null, false);
  } else {
    cb(null, true);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dirImage = path.join("public", "proyect");
    return cb(null, dirImage);
  },
  filename: function (req, file, cb) {
    return cb(
      null,
      "Proyect" +
        "_" +
        Date.now() +
        path.extname(file.originalname.toLowerCase())
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// Controllers
const {
  getProyects,
  saveProyect,
} = require("../controllers/proyecto.controller");

router.get("/", getProyects);
router.post("/saveProyect", auth, upload.single("image"), saveProyect);

module.exports = router;
