import context from "audio-context";

export const AUDIO_LOAD_START = "/resources/audio-load-start";
export const AUDIO_LOAD_ALL_END = "/resources/audio-loaded-end";
export const AUDIO_LOADED = "/resources/audio-loaded";

export default class Resources {
  constructor(events, set) {
    const config = set.loader;
    const sources = config.production || config.sources;
    const types = Object.keys(sources);
    const data = types.reduce((resources, type) => {
      resources[type] = {};
      return resources;
    }, {});
    Object.assign(this, data);

    const clipNames = Object.keys(set.clips);
    startLoading(events, data, clipNames, types, sources);
  }
}

function startLoading(events, data, clipNames, types, sources) {
  const requests = createRequests(types, sources, clipNames);
  fetchAudio(data, requests).then(requests => {
    events.emit(AUDIO_LOAD_ALL_END, requests);
    console.log("All audio file loaded");
  });
}

const url = (source, name) => source.replace("{{filename}}", name);

function createRequests(types, sources, clipNames) {
  return types.reduce((resources, type) => {
    // Could be more than one source url
    const source = sources[type][0];
    clipNames.forEach(name => {
      resources.push({
        type,
        name,
        url: url(source, name),
        status: "new"
      });
    });
    return resources;
  }, []);
}

function fetchAudio(data, requests) {
  const audio = requests.filter(r => r.type === "audio");
  return Promise.all(
    audio.map(req =>
      fetchAudioBuffer(req.url)
        .then(buffer => {
          req.status = "completed";
          req.buffer = buffer;
          return req;
        })
        .then(() => {
          data.audio[req.name] = req.buffer;
          return req;
        })
    )
  );
}

function fetchAudioBuffer(url) {
  const ctx = context();
  return fetch(url)
    .then(function(response) {
      return response.arrayBuffer();
    })
    .then(function(audioData) {
      return ctx.decodeAudioData(audioData);
    });
}
