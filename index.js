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

io.on("connection", (socket) => {
  console.log(`new user connected ${socket.id}`);

  // listen for the 'cart' event
  socket.on("businessId", async (data) => {
    try {
      // Emit the updated cart data to all connected clients
      io.emit("businessId", data);
    } catch (error) {
      console.error(`Error in cart event: ${error}`);
    }
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

server.listen(3000, "0.0.0.0", () => {
  console.log("listinights connected 3000");
});
