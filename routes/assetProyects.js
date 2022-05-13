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
    let dirImage = path.join("public", "assets-proyectos");
    return cb(null, dirImage);
  },
  filename: function (req, file, cb) {
    return cb(
      null,
      "Assets" +
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
  getAssets,
  saveAsset,
} = require("../controllers/assetsProyect.controller");

router.get("/:id", getAssets);
router.post("/saveAsset/:id", auth, upload.single("image"), saveAsset);

module.exports = router;
