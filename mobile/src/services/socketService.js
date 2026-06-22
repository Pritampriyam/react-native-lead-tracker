import { io } from "socket.io-client";

console.log("Socket Service Loaded");

const socket = io("https://react-native-lead-tracker.onrender.com", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("Socket Connected:", socket.id);
});

socket.on("connect_error", (err) => {
  console.log("Socket Error:", err.message);
});

export default socket;