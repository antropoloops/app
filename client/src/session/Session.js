import nanobus from "nanobus";
import connect from "./room";
import Resources from "./Bundle";
import Player from "./Player";
import { getResources, getPlayer } from "./cache";

/**
 * A Session. There's only one session per application instance (@see ./index.js)
 * Basically it contains all state that is not serializable
 */
class Session {
  constructor(url, websockets) {
    this.url = url;
    this.events = nanobus();
    this.events.on("*", (event, payload) =>
      console.log("EVENT >>", event, payload)
    );
    connect(
      this.events,
      websockets
    );
  }

  use(set) {
    const { events } = this;
    const resource = getResources(set, () => new Resources(events, set));
    const player = getPlayer(set, () => new Player(events, set, resource));
    Object.assign(this, { set, resource, player });
    console.log("Session", this);
  }
}

export default Session;
