const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static("public"));

// Keep a list of connected clients for demo
let connectedUsers = {};

io.on("connection", (socket) => {
  connectedUsers[socket.id] = socket.id;

  // Inform everyone about connected users
  io.emit("users list", Object.keys(connectedUsers));
  // Handle public (chat) messages
  socket.on("chat message", (msg) => {
    io.emit("chat message", {
      from: socket.id,
      msg,
    });
  });

  // Handle direct (private) messages
  socket.on("private message", ({ to, msg }) => {
    socket.to(to).emit("private message", {
      from: socket.id,
      msg,
    });
  });

  // Handle joining a room
  socket.on("join room", (roomName) => {
    socket.join(roomName);
    socket.emit("joined room", roomName);
  });

  // Handle sending message to a room
  socket.on("room message", ({ room, msg }) => {
    // Send to everyone in the room (except sender)
    socket.to(room).emit("room message", {
      from: socket.id,
      room,
      msg,
    });
  });

  socket.on("disconnect", () => {
    delete connectedUsers[socket.id];
    io.emit("users list", Object.keys(connectedUsers));
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
