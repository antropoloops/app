const Emitter = require("events");

const Events = {
  /**
   * The client wants to create a room
   */
  create: "@rooms/create",
  /**
   * The client wants to join a room
   */
  join: "@rooms/join",
  /**
   * Server sends server status
   */
  status: "@rooms/status",
  /**
   * Send current room to client
   */
  room: "@rooms/room",
  /**
   * An action has ocurred
   */
  action: "@rooms/action"
};

const Emit = {
  createRoom: roomId => events => events.emit(Events.create, roomId),
  joinRoom: roomId => events => events.emit(Events.join, roomId),
  action: action => events => events.emit(Events.action, action)
};

const Listen = {
  createRoom: cb => events => events.on(Events.create, cb),
  joinRoom: cb => events => events.on(Events.join, cb)
};

function listen(socket, cb) {
  cb(Listen).forEach(listen => listen(socket));
}

module.exports = { Events, Emit, Listen, listen, Emitter };
