const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { setIO } = require("./config/socket");
const { getIO } = require("./config/socket");
const { sampleLead } = require("./services/leadService");
const webhookRoutes = require("./routes/webhookRoutes");




const app = express();
app.use(express.json());



const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

setIO(io);

app.use("/webhook", webhookRoutes);

app.get("/", (req, res) => {
    res.send("Backend Running");
});

io.on("connection", (socket) => {
    console.log("Socket connection received");
    console.log("Client Connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("Client Disconnected:", socket.id);
    });
});


app.get("/test-lead", (req, res) => {
  getIO().emit("newLead", sampleLead);

  res.json({
    success: true,
    lead: sampleLead,
  });
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});