const http = require("./server-http");
const websocket = require("./server-websocket");
const clients = require("./client.service");

const PORT = 4000;

const server = http(clients, rooms);
websocket(clients, server);

server.listen(PORT, () => console.log("Listening on localhost:" + PORT));
