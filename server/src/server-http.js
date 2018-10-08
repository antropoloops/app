const micro = require("micro");
const { version } = require("../package.json");
const { send } = micro;

module.exports = function createHttpServer(clients, rooms) {
  console.log("Antropoloops server v" + version);
  const startedAt = new Date();

  const server = micro(async (req, res) => {
    send(res, 200, {
      version,
      startedAt,
      users: clients.getAvailableUsers()
    });
  });

  return server;
};
