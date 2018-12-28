const wget = require("node-wget");
const fs = require("fs");
const path = require("path");

const mkdir = dir => !fs.existsSync(dir) && fs.mkdirSync(dir);

const NAMES = ["continentes", "lik03", "test"];

const rootPath = path.join(__dirname, "..");
const buildPath = path.join(rootPath, "client/public/audiosets");
const tmpPath = path.join(rootPath, "client/public/tmp");
mkdir(tmpPath);

const audiosets = NAMES.map(name =>
  require(`${buildPath}/${name}.audioset.json`)
);

audiosets.forEach(audioset => {
  const resources = Object.assign({}, audioset.resources.default);
  console.log(audioset.id, resources);
  const setPath = path.join(tmpPath, audioset.id);
  mkdir(setPath);
  const clipNames = Object.keys(audioset.clips);

  Object.keys(resources).forEach(type => {
    const source = resources[type];
    const typePath = path.join(setPath, type);
    mkdir(typePath);
    const dest = typePath.toString() + "/";
    clipNames.forEach(name => {
      download(dest, name, source);
    });
  });
});

function download(dest, name, source) {
  const url = source.replace("{{filename}}", name);
  const filename = url.slice(url.lastIndexOf("/") + 1);
  const target = path.join(dest, filename);
  if (fs.existsSync(target)) {
    console.log("Exists (skip)", url);
  } else {
    console.log("Write", target);
    wget({ url, dest });
  }
}
