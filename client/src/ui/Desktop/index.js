import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { attachVisuals, detachVisuals } from "../../session/actions";
import Desktop from "./Desktop";

const mapStateToProps = session => ({
  audioset: session.audioset
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ attachVisuals, detachVisuals }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Desktop);
