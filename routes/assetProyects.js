var express = require("express");
var router = express.Router();
const auth = require("../uttilities/middlewareAuth");
const fileFilterMiddleware = require("../uttilities/file-extension");
var path = require("path");
const multer = require("multer");
let counter = 1;

// Multer

const fileFilter = (req, file, cb) => {
  const validFormats = [".jpg", ".jpeg", ".png", ".mp4", ".mov"];
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
    counter++

    return cb(
      null,
      "Assets" +
      "_" +
      Date.now() +
      "_" +
      counter +
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
  deleteAssets
} = require("../controllers/assetsProyect.controller");

router.get("/:id", getAssets);
router.post("/saveAsset/:id", auth, fileFilterMiddleware, upload.array("image"), saveAsset);
router.delete("/deleteAssets", auth, deleteAssets);

module.exports = router;