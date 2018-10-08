import io from "socket.io-client";

export const CONNECTED = "/rooms/CONNECTED";
export const DISCONNECTED = "/rooms/DISCONNECTED";
export const USER = "/rooms/USER";

export default function connect(events, server = "http://localhost:4000") {
  const socket = io.connect(server);

  socket.on("connect", () => {
    events.emit(CONNECTED);
  });
  socket.on("disconnect", () => {
    events.emit(DISCONNECTED);
  });
  socket.on("@ATPLS/WELCOME", function(userId) {
    events.emit(USER, userId);
  });
  return events;
}
