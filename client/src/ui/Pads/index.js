import { connect } from "react-redux";
import Pads from "./Pads";
import { pressPad, releasePad } from "../../session/actions";

const mapStateToProps = session => ({
  audioset: session.audioset,
  status: session.audio.status
});

const mapDispatchToProps = dispatch => ({
  onPadPressed: pad => dispatch(pressPad(pad)),
  onPadReleased: pad => dispatch(releasePad(pad))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pads);
