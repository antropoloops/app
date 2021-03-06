import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import cxs from "cxs/component";
import Toolbar from "./Toolbar";
import Welcome from "../Welcome";
import Visuals from "./Visuals";
import Pads from "../Pads";
import Tracks from "../Tracks";
import Keyboard from "../Keyboard";
import Modal from "react-modal";
import Fullscreen from "../../browser/fullscreen";
import Help from "./Help";

const initialState = audioset => ({
  isFullscreen: false,
  welcomeVisible: !audioset,
  padsVisible: false,
  tracksVisible: false,
  help: false
});

// Actions
const setHelpVisible = isVisible => ({ type: "help", isVisible });
const setWelcomeVisible = isVisible => ({ type: "welcome", isVisible });
const setPadsVisible = isVisible => ({ type: "pads", isVisible });
const setTracksVisible = isVisible => ({ type: "tracks", isVisible });
const setFullscreen = isFullscreen => ({ type: "fullscreen", isFullscreen });

function reducer(state, action) {
  switch (action.type) {
    case "welcome":
      return { ...state, welcomeVisible: action.isVisible };
    case "fullscreen":
      return { ...state, isFullscreen: action.isFullscreen };
    case "help":
      return { ...state, help: action.isVisible };
    case "pads":
      return { ...state, padsVisible: action.isVisible };
    case "tracks":
      return { ...state, tracksVisible: action.isVisible };
    default:
      return state;
  }
}

const App = ({ audioset, attachVisuals, detachVisuals }) => {
  const [state, disp] = useReducer(reducer, initialState(audioset));

  // Handlers
  const togglePads = () => disp(setPadsVisible(!state.padsVisible));
  const toggleTracks = () => disp(setTracksVisible(!state.tracksVisible));
  const showFullscreen = () => Fullscreen.changeFullscreen(!state.isFullscreen);
  const hideWelcome = () => disp(setWelcomeVisible(false));
  const showWelcome = () => disp(setWelcomeVisible(true));
  const onHelp = () => disp(setHelpVisible(true));
  const onHelpStop = () => disp(setHelpVisible(false));

  useEffect(
    () =>
      Fullscreen.onChange(isFullscreen => disp(setFullscreen(isFullscreen))),
    []
  );

  const notFull = !state.isFullscreen;

  return (
    <>
      {audioset && (
        <Main className="App">
          <Help run={state.help} onStop={onHelpStop} />
          {notFull && (
            <Toolbar
              audioset={audioset}
              onHelp={onHelp}
              audio={{}}
              onCloseAudioset={showWelcome}
              onTogglePads={togglePads}
              onToggleTracks={toggleTracks}
              onFullscreen={showFullscreen}
            />
          )}
          <Content>
            {notFull && state.padsVisible && <Pads />}
            <Center>
              {/* <Visuals
                audioset={audioset}
                onStart={attachVisuals}
                onStop={detachVisuals}
              /> */}
            </Center>
            {notFull && state.tracksVisible && <Tracks />}
          </Content>
          {notFull && <Keyboard />}
        </Main>
      )}
      <Modal
        isOpen={!audioset || state.welcomeVisible}
        shouldCloseOnOverlayClick={true}
        onRequestClose={hideWelcome}
        style={ModalStyles}
      >
        <Welcome onClose={hideWelcome} />
      </Modal>
    </>
  );
};

App.propTypes = {
  audioset: PropTypes.object,
  events: PropTypes.object
};

const ModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 900
  },
  content: {
    // http://lynn.io/2014/02/22/modalin/
    position: "fixed",
    maxHeight: "calc(100% - 100px)",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    // position: "absolute",
    // top: "40px",
    // left: "0px",
    // right: "auto",
    // bottom: "40px",
    border: "",
    background: "black",
    borderRadius: 0,
    zIndex: 1000
  }
};

const Main = cxs("div")({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh"
});

const Content = cxs("div")({
  display: "flex",
  flexGrow: 1,
  flexDirection: "row",
  height: "100%",
  minHeight: "100%",
  maxHeight: "100%",
  overflow: "hidden"
});

const Center = cxs("div")({
  flexGrow: 1
});

export default App;
