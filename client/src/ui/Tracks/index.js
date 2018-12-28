import { connect } from "react-redux";
import Tracks from "./Tracks";
import { changeTrackVolume, pressPad, releasePad } from "../../session/actions";

const mapStateToProps = session => ({
  audioset: session.audioset,
  status: session.audio.status,
  volumes: session.tracks.volumes,
  playing: session.tracks.playing
});

const mapDispatchToProps = dispatch => ({
  onVolumeChanged: (track, value) => dispatch(changeTrackVolume(track, value)),
  onPress: pad => dispatch(pressPad(pad)),
  onRelease: pad => dispatch(releasePad(pad))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tracks);
