import connect from "./room";
import Resources from "./Resources";
import Player from "./Player";
import createEventBus, { audiosetChanged } from "./events";
import { getResources, getPlayer } from "./cache";

/**
 * A Session. There's only one session per application instance (@see ./index.js)
 * Basically it contains all state that is not serializable
 */
class Session {
  constructor(url, websockets) {
    this.url = url;
    this.events = createEventBus();
    if (process.env.NODE_ENV === "development") {
      this.events.on("*", (event, payload) =>
        console.log("@@EVENT", event, payload)
      );
    }
    connect(
      this.events,
      websockets
    );
  }

  on(event, cb) {
    this.events.on(event, cb);
  }

  use(set) {
    const { events } = this;
    const resource = getResources(set, () => new Resources(events, set));
    const player = getPlayer(set, () => new Player(events, set, resource));
    Object.assign(this, { set, resource, player });
    events.emit(audiosetChanged(set, resource));
    return set;
  }

  fetchIndex() {
    return fetch(`${this.url}/audioset.index.json`).then(response =>
      response.json()
    );
  }

  loadAudioset(setId) {
    return fetch(`${this.url}/${setId}.audioset.json`)
      .then(res => res.json())
      .then(set => this.use(set));
  }
}

export default Session;
