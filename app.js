const express = require("express");
const app = express();
const path = require("path");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const cookieParser = require('cookie-parser')
const port = 60000;

module.exports.io = io;

app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());

/*
const db = require("./db/db");
db.db.connect((err) => {
  if (err) console.log(err);
  else console.log("MY sql connected");
});
*/
app.use("/", require("./routes/pages"));
app.use("/users", require("./routes/users"));
app.use("/game", require("./routes/game"));

http.listen(port, () => console.log(`Example app listening on ${port}`));
