import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Welcome from "./Welcome";
import { fetchIndex, fetchAudioset } from "../../audioset";
import { setAudioset } from "../../session/actions";

const WelcomeState = ({ audioset, onClose, onChangeAudioset }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(null);
  useEffect(
    () => {
      let mounted = true;
      fetchIndex().then(index => mounted && setIndex(index));
      return () => (mounted = false);
    },
    [audioset]
  );

  const changeAudioset = audioset => {
    setIsLoading(true);
    fetchAudioset(audioset.id)
      .then(onChangeAudioset)
      .then(onClose);
  };

  const closeAudioset = () => onChangeAudioset(null);

  return (
    <Welcome
      audioset={audioset}
      audiosetIndex={index}
      onChangeAudioset={changeAudioset}
      onCloseAudioset={closeAudioset}
    />
  );
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onChangeAudioset: audioset => dispatch(setAudioset(audioset))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeState);
