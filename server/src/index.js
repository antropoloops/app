const HttpServer = require("./http");
const Server = require("./server");
const socket = require("socket.io");

const PORT = 4000;
const server = new Server();

const http = HttpServer(server);

const io = socket(http);
server.broadcast = (event, data) => io.emit(event, data);
io.on("connection", client => server.addClient(client));

http.listen(PORT, () => {
  const address = "http://localhost:" + PORT;
  console.log("Http server listenen at " + address);
});

process.once("SIGUSR2", function() {
  server.close();
  io.close(() => {
    process.kill(process.pid, "SIGUSR2");
  });
});
