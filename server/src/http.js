const debug = require("debug")("atpls:http");
const micro = require("micro");
const { version } = require("../package.json");
const { send } = micro;

module.exports = function createHttpServer(server) {
  const startedAt = new Date();

  const httpServer = micro(async (req, res) => {
    send(res, 200, {
      version,
      startedAt
    });
  });
  debug("Http server started at %o", startedAt);

  return httpServer;
};
