const wget = require("node-wget");
const fs = require("fs");
const path = require("path");

const mkdir = dir => !fs.existsSync(dir) && fs.mkdirSync(dir);

const NAMES = ["continentes", "lik03"];

const rootPath = path.join(__dirname, "..");
const buildPath = path.join(rootPath, "audiosets/build");
const tmpPath = path.join(rootPath, "client/public/tmp");
mkdir(tmpPath);

const audiosets = NAMES.map(name =>
  require(`${buildPath}/${name}.audioset.json`)
);

audiosets.forEach(audioset => {
  const sources = audioset.loader.sources.audio;
  console.log(audioset.id, sources);
  const destPath = path.join(tmpPath, audioset.id);
  mkdir(destPath);
  const dest = destPath.toString() + "/";

  sources.forEach(source => {
    const clipNames = Object.keys(audioset.clips);
    clipNames.forEach(name => {
      download(dest, name, source, audioset.clips[name]);
    });
  });
});

function download(dest, name, source, clip) {
  const url = source.replace("{{filename}}", name);
  const filename = url.slice(url.lastIndexOf("/") + 1);
  const target = path.join(dest, filename);
  if (fs.existsSync(target)) {
    console.log("Exists (skip)", url);
  } else {
    console.log("Write", target);
    wget({ url: url, dest });
  }
}
