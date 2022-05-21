var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const {
  conn
} = require("./Db/index.js");
var usersRouter = require("./routes/users");
const galeryRouter = require("./routes/gallery");
const proyectRouter = require("./routes/proyect");
const assetRouter = require("./routes/assetProyects");
const res = require("express/lib/response");
const initDB = require("./utilities/initDB");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", usersRouter);
app.use("/api/gallery", galeryRouter);
app.use("/api/projects", proyectRouter);
app.use("/api/assets", assetRouter);

// Se implementa para que en el resto de las rutas que no son /api la app tome el ruteo de React
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});
app.get("*", (req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});

conn.sync({
    force: false,
  })
  .then(() => {
    app.listen(1500, async () => {
      console.log("%s listening at http://localhost:1500");
      await initDB();
    });
  });

module.exports = app;