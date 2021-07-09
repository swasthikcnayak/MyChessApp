const express = require("express");
const { validateCookie } = require("../controllers/auth");
const router = express.Router();

var activeGames = [];

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateString(length) {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function searchLobbies(gameId) {
  for (var i = 0; i < activeGames.length; i++) {
    if (activeGames[i].gameId == gameId) return activeGames[i];
  }
  return null;
}

const { io } = require("../app.js");

io.on("connection", function (socket) {
  var inGame = false;

  socket.on("createGame", function (callback) {
    do {
      roomName = generateString(5);
    } while (searchLobbies(roomName) !== null);
    const lobby = {
      gameId: roomName,
      game: null,
      full:false,
      rand:Math.round(Math.random())
    };
    activeGames.push(lobby);
    inGame = true;
    socket.join(roomName);
    callback(lobby);
  });

  socket.on("joinGame", (gameId,next)=>{
    game = searchLobbies(gameId);
    if (game != null) {
      if (game.full==false) {
        inGame = true;
        game.full = true;
        socket.join(game.gameId);
        next(game);
      }
    }
  });

  socket.on("move", (move, gameId) => {
    socket.to(gameId).emit("move", move);
  });

  socket.on("close room", (gameId) => {
    console.log("closing rooms")
    inGame = false;
    game = searchLobbies(gameId);
    delete game;
  });

  socket.on("disconnect", (gameId) => {
    ingame = false;
    game = searchLobbies(gameId);
    delete game;
  });
});

/*
router.get("/", validateCookie, (req, res) => {
  res.render("partials/chessBoard");
});
*/

router.get("/",(req, res) => {
  res.render("partials/chessBoard");
});

module.exports = router;
