import React from "react";
import cxs from "cxs";
import PropTypes from "prop-types";
import { Link, Button } from "../shared";

const className = cxs({
  margin: "0 auto",
  lineHeight: "2em",
  fontSize: "14px",
  backgroundColor: "black",
  "& h1, & h2": {
    fontWeight: 400,
    margin: "1em 0"
  }
});

const Welcome = ({
  audioset,
  audiosetIndex,
  onChangeAudioset,
  onCloseAudioset
}) => (
  <div className={className}>
    {audiosetIndex && !audioset && (
      <>
        <h2>Empieza una nueva remezcla</h2>
        {audiosetIndex.map(set => (
          <Link key={set.id} onClick={() => onChangeAudioset(set)}>
            {set.meta.title}: {set.meta.description}
          </Link>
        ))}
      </>
    )}

    {audioset && (
      <>
        <h1>{audioset.meta.title}</h1>
        <p>{audioset.meta.description}</p>
        <Button onClick={onCloseAudioset}>Cerrar audioset</Button>
      </>
    )}
  </div>
);
Welcome.propTypes = {
  onChangeAudioset: PropTypes.func
};

export default Welcome;
