var express = require("express");
var router = express.Router();
const auth = require("../utilities/middlewareAuth");
const fileFilterMiddleware = require("../utilities/file-extension");
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
    let dirImage = path.join("public", "proyect");
    return cb(null, dirImage);
  },
  filename: function (req, file, cb) {
    counter++
    return cb(
      null,
      "Proyect" +
      "_" +
      counter +
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
  getProyectById,
  saveProyect,
  deleteProyect,
  editProyect,
} = require("../controllers/proyecto.controller");

router.get("/", getProyects);
router.get("/:id", getProyectById);
router.post("/saveProyect", fileFilterMiddleware, auth, upload.single("image"), saveProyect);
router.put("/editProyect/:id", fileFilterMiddleware, auth, upload.single("image"), editProyect);
router.delete("/deleteProyect/:id", auth, deleteProyect);

module.exports = router;