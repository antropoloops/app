const nanoid = require("nanoid");
class Clients {
  constructor() {
    this.clients = new Map();
  }
  count() {
    return this.clients.size;
  }
  create(socket) {
    const id = socket.id || nanoid();
    const client = { id, socket };
    this.clients.set(id, client);
    return client;
  }
  emit(id, event, payload) {
    const client = this.clients.get(id);
    if (client) client.socket.emit(event, payload);
  }

  delete(id) {
    this.clients.delete(id);
  }
  forEach(cb) {
    for (let key of this.clients.keys()) {
      cb(this.clients.get(key));
    }
  }
}

module.exports = Clients;
