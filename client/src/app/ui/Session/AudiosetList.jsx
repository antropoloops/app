import React from "react";

const Audioset = ({ set, onLoadSet }) => (
  <div>
    <h3>
      <button onClick={e => onLoadSet(set.id)}>{set.meta.title}</button>
    </h3>
    <div>{set.meta.description}</div>
  </div>
);

const AudiosetList = ({ sets, onLoadSet }) => (
  <div className="AudiosetList">
    <h2>Abre una canción:</h2>
    <ul>
      {sets.map(set => (
        <li key={set.id}>
          <Audioset set={set} onLoadSet={onLoadSet} />
        </li>
      ))}
    </ul>
  </div>
);

export default AudiosetList;
