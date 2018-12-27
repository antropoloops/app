import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Welcome from "./Welcome";
import { fetchIndex, loadAudioset } from "../../audioset";
import { setAudioset } from "../../session/actions";

const WelcomeState = ({ audioset, dispatch, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(null);
  useEffect(
    () => {
      fetchIndex().then(index => setIndex(index));
    },
    [audioset]
  );

  const onChangeAudioset = audioset => {
    setIsLoading(true);
    loadAudioset(audioset.id)
      .then(data => dispatch(setAudioset(data)))
      .then(onClose);
  };

  const onCloseAudioset = () => dispatch(setAudioset(null));

  return (
    <Welcome
      audioset={audioset}
      audiosetIndex={index}
      onChangeAudioset={onChangeAudioset}
      onCloseAudioset={onCloseAudioset}
    />
  );
};

export default connect()(WelcomeState);
