import { sampleStarted, sampleStopped } from "../../session/events";
import { clipOn, clipOff } from "../model/control";

export default function eventsToStore(events, dispatch) {
  events.on(sampleStarted, e => dispatch(clipOn(e.clipId, e.track.name)));
  events.on(sampleStopped, e => dispatch(clipOff(e.clipId, e.track.name)));
}
