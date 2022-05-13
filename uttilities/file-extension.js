const {
  check,
  body
} = require("express-validator");

module.exports = [
  check("image")
  .custom((value, {
    req
  }) => {
    if (req.file !== undefined && req.files === undefined) {
      switch (req.file.mimetype) {
        case "image/jpg":
          return ".jpg";
        case "image/jpeg":
          return ".jpeg";
        case "image/png":
          return ".png";
        case "video/mp4":
          return ".mp4";
        case "video/quicktime":
          return ".mov";
        case "video/x-msvideo":
          return ".avi";
        default:
          return false;
      }
    } else if (req.file === undefined && req.files !== undefined) {
      return !req.files.some(
        (e) =>
        e.mimetype !== "image/jpg" &&
        e.mimetype !== "image/jpeg" &&
        e.mimetype !== "image/png" &&
        e.mimetype !== "video/mp4" &&
        e.mimetype !== "video/quicktime" &&
        e.mimetype !== "video/x-msvideo"
      );
    }
    return false;
  })
  .optional()
  .withMessage(
    "El archivo debe tener formato de imagen (jpg,  jpeg o png) o formato de video (mp4, mov)."
  ),
];