class Rooms {
  constructor() {
    this.rooms = [];
  }

  list() {
    return this.rooms.map(({ id, name, users }) => ({ id, name, users }));
  }

  get(roomId) {
    return this.rooms.find(room => room.id === roomId);
  }

  create(clientId, name) {
    const fullName = `${name}-${clientId.slice(0, 4)}`;
    const room = { id: clientId, name: fullName, users: [clientId] };
    this.rooms.push(room);
    return room;
  }

  delete(roomId) {
    const room = this.get(roomId);
    if (room) this.rooms.filter(room => room.id === roomId);
    return room;
  }
}

module.exports = Rooms;
