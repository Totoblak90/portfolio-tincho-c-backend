var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const { conn } = require("./Db/index.js");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const res = require("express/lib/response");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);
app.use("/api/users", usersRouter);

conn.sync({ force: true }).then(() => {
  app.listen(1500, () => {
    console.log("%s listening at 1500"); // eslint-disable-line no-console
  });
});
module.exports = app;
