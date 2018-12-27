const Server = require("./server");
const { Emitter, Emit } = require("./events");
const _ = require("lodash");

class TestClient {
  constructor(id) {
    this.id = `${id}.client`;
    this.bus = new Emitter();
    this.sent = [];
    this.received = [];
    this.send = _.mapValues(Emit, emit => (...args) => emit(...args)(this.bus));
  }

  on(event, cb) {
    this.bus.on(event, cb);
  }

  emit(event, data) {
    this.last = { event, data };
    this.received.push(this.last);
  }
}

describe("Server", () => {
  let server, clients, c1, c2, c3;
  beforeEach(() => {
    server = new Server();
    clients = [1, 2, 3].map(id => new TestClient(id));
    clients.forEach(c => server.addClient(c));
    [c1, c2, c3] = clients;
  });

  test("propagate actions", () => {
    c1.send.createRoom("myRoom");
    c2.send.joinRoom("1.client");
    c3.send.joinRoom("1.client");
    c1.send.action({ type: "MESSAGE", payload: "the message" });
    expect(c2.last).toEqual({
      data: { payload: "the message", type: "MESSAGE" },
      event: "@rooms/action"
    });
    expect(c3.last).toEqual(c2.last);
    expect(c1.last).not.toEqual(c2.last);
  });

  test("propagate room change", () => {
    c1.send.createRoom("roomName");
    expect(c1.last).toEqual({
      event: "@rooms/status",
      data: {
        rooms: [{ id: "1.client", name: "roomName-1.cl", users: ["1.client"] }]
      }
    });
    expect(c2.last).toEqual(c1.last);
    expect(c3.last).toEqual(c1.last);
  });
});
