const { log } = require("console");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded());

app.post("/", (req, res) => {
  const { businessId, payload } = req.body;
  io.emit(businessId, JSON.stringify(payload));
  res.status(200).send({ statusbar: "success" });
});

io.on("connection", (socket) => {
  console.log("new user connected");
});

server.listen(3000, () => {
  console.log("listinights connected", 3000);
});
