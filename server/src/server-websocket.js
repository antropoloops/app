const makeHandlers = require("./old/handlers");
const socket = require("socket.io");

module.exports = function createServer(clients, server) {
  const io = socket(server);

  io.on("connection", function(client) {
    console.log("client connected...", client.id);
    clients.addClient(client);
    io.emit("hi");
    client.emit("@ATPLS/WELCOME", client.id);

    client.on("disconnect", function() {
      console.log("client disconnect...", client.id);
    });

    client.on("error", function(err) {
      console.log("received error from client:", client.id);
      console.log(err);
    });
  });
};
