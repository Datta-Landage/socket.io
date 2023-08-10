const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const cors = require("cors");

const io = new Server(server, {
  cors: {
    origin: "https://socketfrontend.vercel.app/",
    methods: ["GET", "POST"],
  },
});
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.post("/", (req, res) => {
  const { businessId, payload } = req.body;
  io.emit(businessId, JSON.stringify(payload));
  res.status(200).send({ statusbar: "success" });
});

io.on("connection", (socket) => {
  console.log("new user connected");
});

server.listen(3000, "0.0.0.0", () => {
  console.log("listinights connected 3000");
});
