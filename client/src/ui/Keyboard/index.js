import { connect } from "react-redux";
import Keyboard from "./Keyboard";
import { pressPad, releasePad } from "../../session/actions";

const mapStateToProps = session => ({
  audioset: session.audioset,
  status: session.audio.status
});

const mapDispatchToProps = dispatch => ({
  onPress: pad => dispatch(pressPad(pad)),
  onRelease: pad => dispatch(releasePad(pad))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Keyboard);
