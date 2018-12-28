import { connect } from "react-redux";
import Desktop from "./Desktop";

const mapStateToProps = session => ({
  audioset: session.audioset
});

export default connect(mapStateToProps)(Desktop);
