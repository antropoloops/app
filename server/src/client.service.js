const clients = new Map();

function addClient(client) {
  clients.set(client.id, { client });
}

function removeClient(client) {
  clients.delete(client.id);
}

module.exports = { addClient };
