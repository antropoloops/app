const http = require("./http-server");
const websocket = require("./websocket-server");
const ClientManager = require("./ClientManager");
const ChatroomManager = require("./ChatroomManager");

const PORT = 4000;

const clients = ClientManager();
const rooms = ChatroomManager();

const server = http(clients, rooms);
websocket(clients, rooms, server);

server.listen(PORT, () => console.log("Listening on localhost:" + PORT));
