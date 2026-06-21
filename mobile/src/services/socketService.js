import { io } from "socket.io-client";

const socket = io("https://react-native-lead-tracker.onrender.com", {
  transports: ["websocket"],
});

export default socket;