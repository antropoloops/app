const debug = require("debug")("atpls:server");
const Clients = require("./clients");
const Rooms = require("./rooms");
const { Events, listen } = require("./events");

class Server {
  constructor() {
    this.clients = new Clients();
    this.rooms = new Rooms();
  }

  close() {
    this.clients.forEach(client => {
      this.removeClient(client.id);
    });
    debug("Server closed");
  }

  broadcast(name, event) {
    this.clients.forEach(client => {
      client.socket.emit(name, event);
    });
  }

  broadcastAction(client, action) {
    const room = this.rooms.get(client.roomId);
    if (!room) return;
    debug("Action broadcast %o to %o", action, room.users);
    room.users.forEach(clientId => {
      if (clientId !== client.id) {
        this.clients.emit(clientId, "@rooms/action", action);
      }
    });
  }

  getStatus() {
    return {
      rooms: this.rooms.list()
    };
  }

  addClient(socket) {
    const client = this.clients.create(socket);
    socket.on("disconnect", () => this.removeClient(client));
    listen(socket, Event => [
      Event.createRoom(name => this.createRoom(client, name)),
      Event.joinRoom(roomId => this.joinRoom(client, roomId))
    ]);
    socket.on("@rooms/action", action => this.broadcastAction(client, action));
    socket.emit(Events.status, this.getStatus());
    debug("Client created %s %d", client.id, this.clients.count());
  }

  removeClient(client) {
    const room = this.rooms.get(client.roomId);
    if (room) room.users = room.users.filter(id => id === client.id);
    this.deleteRoom(client.id);
    this.clients.delete(client.id);
    debug("Client removed %s", client.id);
  }

  deleteRoom(roomId) {
    const room = this.rooms.delete(roomId);
    if (room) {
      room.users.forEach(clientId => {
        this.clients.emit(clientId, "room", null);
      });
      this.broadcast(Events.status, this.getStatus());
      debug("Room removed %s", roomId);
    }
  }

  createRoom(client, name) {
    const room = this.rooms.create(client.id, name);
    client.roomId = room.id;
    client.socket.emit(Events.room, room);
    this.broadcast(Events.status, this.getStatus());
    debug("Room created %o", room);
  }

  joinRoom(client, roomId) {
    const room = this.rooms.get(roomId);
    if (room) {
      room.users.push(client.id);
      client.roomId = room.id;
      client.socket.emit(Events.room, room);
      debug("Client %s joined %o", client.id, room);
    }
  }
}

module.exports = Server;
