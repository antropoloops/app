import React from "react";
import { connect } from "react-redux";
import Session from "../Session";
import Control from "../Control";
import Loading from "./Loading";
import Header from "./Header";

import { loadIndex } from "../../model/audiosets";
import { closeTrack } from "../../model/control";

const reloadSession = dispatch => () => dispatch(loadIndex());
const closeCurrentTrack = (track, dispatch) => () =>
  track && dispatch(closeTrack());

class App extends React.Component {
  render() {
    const { isLoading, hasAudioset, set, dispatch, track } = this.props;
    return (
      <div className="App">
        <Header
          set={set}
          track={track}
          onHomeClicked={reloadSession(dispatch)}
          onSetClicked={closeCurrentTrack(track, dispatch)}
          onTrackClicked={closeCurrentTrack(track, dispatch)}
        />
        <Loading
          isLoading={isLoading}
          render={() => (hasAudioset ? <Control /> : <Session />)}
        />
      </div>
    );
  }

  renderSession() {}
}

const mapStateToProps = state => ({
  set: state.audiosets.current,
  track: state.control.track,
  isLoading: state.audiosets.status !== "done",
  hasAudioset: !!state.audiosets.current
});

export default connect(mapStateToProps)(App);
