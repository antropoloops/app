import React from "react";
import { connect } from "react-redux";
import { loadSet } from "../../model/audiosets";
import AudiosetList from "./AudiosetList";

const handleLoad = dispatch => setId => dispatch(loadSet(setId));

const Audiosets = ({ index, dispatch }) => (
  <div className="Audiosets">
    <AudiosetList sets={index.audiosets} onLoadSet={handleLoad(dispatch)} />
  </div>
);

const mapStateToProps = state => state.audiosets;

export default connect(mapStateToProps)(Audiosets);
