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
    const { audiosets, control, dispatch } = this.props;
    const set = audiosets.current;
    const { track, tracksPlaying } = control;
    const isLoading = audiosets.status !== "done";
    return (
      <div className="App">
        <Header
          set={set}
          track={track}
          tracksPlaying={tracksPlaying}
          onHomeClicked={reloadSession(dispatch)}
          onSetClicked={closeCurrentTrack(track, dispatch)}
          onTrackClicked={closeCurrentTrack(track, dispatch)}
        />
        <Loading
          isLoading={isLoading}
          render={() => (set ? <Control /> : <Session />)}
        />
      </div>
    );
  }

  renderSession() {}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(App);
