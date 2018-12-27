import { connect } from "react-redux";
import App from "./App";

const mapStateToProps = session => ({
  audioset: session.audioset
});

export default connect(mapStateToProps)(App);
