var game;
var board;
var socket = io();
var gameId;
var player;
var initGame = function (rand) {
  var config;
  if(rand==0){
  config = {
    draggable: true,
    position: "start",
    onDrop: handleMove,
    showNotation:false,
    orientation: "white"
  };
  player="b";
}
  else{
  config = {
    draggable: true,
    position: "start",
    onDrop: handleMove,
    showNotation:false,
    orientation: "black"
  };
  player="w";
}
  board = new Chessboard("gameBoard", config);
  game = new Chess();
};

var handleMove = function (src, target) {
  var move = game.move({ from: src, to: target });
  if (move === null || move.color==player) return "snapback";
  socket.emit("move", move,gameId);
};

socket.on("move", function (move) {
  game.move(move);
  board.position(game.fen());
});

socket.on("update board",function(board){
  console.log(board);
})

socket.on("disconnect", (gameId));



$('#createGame').click(async function () {
  await socket.emit("createGame", (lobby)=>{
    gameId = lobby.gameId;
    $('#currentRoomId').html(gameId);
    initGame(lobby.rand);
  });
});


$('#joinGame').click(async function () {
  var id = $("#gameId").val();
  currGameId = id;
  gameId = currGameId;
  await socket.emit("joinGame",currGameId,(lobby)=>{
    $('#currentRoomId').html(gameId);
    console.log(lobby.rand);
    initGame(Math.abs(lobby.rand-1));
  });
  
});


$('#endGame').click(function () {
  socket.emit("close room",(gameId))
});
