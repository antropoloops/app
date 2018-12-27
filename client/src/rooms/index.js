import io from "socket.io-client";
import Nanobus from "nanobus";

const NO_SOCKET = {
  on(type) {
    console.warn("Add listener to no socket", type);
  },
  emit(type, event) {
    console.warn("Emit event to no socket", type, event);
  }
};

class Client {
  constructor(url) {
    this.handleAction = action => console.log("unhandled action", action);
    this.socket = NO_SOCKET;
    this.connected = false;
    this.status = { audiosets: [], rooms: [] };
    this.events = Nanobus();
    if (url) this.connect(url);
  }

  connect(url) {
    this.socket = io.connect(url);
    this.socket.on("connect", () => {
      this.connected = true;
    });
    this.socket.on("@rooms/room", data => {
      this.events.emit("room", data);
    });
    this.socket.on("@rooms/status", data => {
      this.events.emit("status", data);
    });
    this.socket.on("@rooms/action", action => {
      this.handleAction(action);
    });
  }

  dispatch(action) {
    this.handleAction(action);
    this.socket.emit("@rooms/action", action);
  }

  onAction(handleAction) {
    this.handleAction = handleAction;
  }

  createRoom(audiosetId) {
    this.socket.emit("@rooms/create", audiosetId);
  }

  joinRoom(roomId) {
    this.socket.emit("@rooms/join", roomId);
  }

  on(event, cb) {
    this.events.on(event, cb);
  }
}

export default Client;
