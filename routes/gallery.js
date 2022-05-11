// Imports

var express = require("express");
var router = express.Router();
var path = require('path')
const multer = require("multer");
const {
    getPhotos,
    savePhoto
} = require("../controllers/galeria.controller");

const auth = require("../uttilities/middlewareAuth");


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
        let dirImage = path.join("public", "gallery");
        return cb(null, dirImage);
    },
    filename: function (req, file, cb) {
        return cb(
            null,
            "Gallery" + "_" + Date.now() + path.extname(file.originalname.toLowerCase())
        );
    },
});

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

// Rutas

router.get("/", getPhotos);

router.post("/save", auth, upload.single("image"), savePhoto)

module.exports = router;