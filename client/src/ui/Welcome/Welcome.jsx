import React from "react";
import cxs from "cxs/component";
import PropTypes from "prop-types";
import { Link } from "../shared";

const Welcome = ({
  className,
  audiosetIndex,
  onChangeAudioset,
  onCloseAudioset
}) => (
  <div className={className}>
    {audiosetIndex && (
      <>
        <h2>Empieza una nueva remezcla</h2>
        {audiosetIndex.map(set => (
          <Link key={set.id} onClick={() => onChangeAudioset(set)}>
            {set.meta.title}: {set.meta.description}
          </Link>
        ))}
        <Link onClick={onCloseAudioset}>Cerrar audioset</Link>
      </>
    )}
  </div>
);
Welcome.propTypes = {};

export default cxs(Welcome)({
  maxWidth: "40em",
  margin: "0 auto",
  lineHeight: "2em",
  fontSize: "14px",
  backgroundColor: "black",
  "& h1, & h2": {
    fontWeight: 400,
    margin: "1em 0"
  }
});
