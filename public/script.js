const socket = io();

const myidSpan = document.getElementById("myid");
const usersDiv = document.getElementById("users");
const messagesDiv = document.getElementById("messages");

function append(msg) {
  const div = document.createElement("div");
  div.textContent = msg;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Show your Socket ID
socket.on("connect", () => {
  myidSpan.textContent = socket.id;
  append("Connected! Your ID: " + socket.id);
});

// Show all connected users
socket.on("users list", (users) => {
  usersDiv.textContent = users.join(", ");
});

// Public message to all
document.getElementById("send").onclick = () => {
  const input = document.getElementById("input");
  if (input.value) {
    socket.emit("chat message", input.value);
    append("You (public): " + input.value);
    input.value = "";
  }
};

// Receive public message
socket.on("chat message", (data) => {
  append("Public from " + data.from + ": " + data.msg);
});

// Send private message
document.getElementById("sendPrivate").onclick = () => {
  const to = document.getElementById("privateTo").value.trim();
  const msg = document.getElementById("privateMsg").value.trim();
  if (to && msg) {
    socket.emit("private message", { to, msg });
    append(`You (private to ${to}): ${msg}`);
    document.getElementById("privateMsg").value = "";
  }
};

// Receive private message
socket.on("private message", ({ from, msg }) => {
  append(`Private from ${from}: ${msg}`);
});

// Join a room
document.getElementById("joinRoom").onclick = () => {
  const room = document.getElementById("room").value.trim();
  if (room) {
    socket.emit("join room", room);
  }
};

// Confirm joining room
socket.on("joined room", (room) => {
  append(`You joined room: ${room}`);
});

// Send message to room
document.getElementById("sendRoom").onclick = () => {
  const room = document.getElementById("room").value.trim();
  const msg = document.getElementById("roomMsg").value.trim();
  if (room && msg) {
    socket.emit("room message", { room, msg });
    append(`You (to room ${room}): ${msg}`);
    document.getElementById("roomMsg").value = "";
  }
};

// Receive room message
socket.on("room message", ({ from, room, msg }) => {
  append(`Room ${room} from ${from}: ${msg}`);
});
