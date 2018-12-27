import { connect } from "react-redux";
import Toolbar from "./Toolbar";
import { setAudioset, stopAudio } from "../../session/actions";

const mapStateToProps = session => ({
  audioset: session.audioset,
  audio: session.audio
});

const mapDispatchToProps = dispatch => ({
  onCloseAudioset: () => dispatch(setAudioset(null)),
  onStopAll: () => dispatch(stopAudio())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);
