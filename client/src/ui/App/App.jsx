import React, { useState } from "react";
import PropTypes from "prop-types";
import cxs from "cxs/component";
import Toolbar from "./Toolbar";
import Welcome from "../Welcome";
import Visuals from "./Visuals";
//import Pads from "../Pads";
import Keyboard from "../Keyboard";
import Modal from "react-modal";

const App = ({ audioset, events, dispatch }) => {
  const [isWelcome, setIsWelcome] = useState(true);

  const hideWelcome = () => audioset && setIsWelcome(false);
  const showWelcome = () => setIsWelcome(true);
  return (
    <>
      {audioset && (
        <Main className="App">
          <Toolbar
            audioset={audioset}
            audio={{}}
            onCloseAudioset={showWelcome}
          />
          <Content>
            <Center>
              <Visuals audioset={audioset} events={events} />
            </Center>
          </Content>
          <Keyboard />
        </Main>
      )}
      <Modal
        isOpen={isWelcome}
        shouldCloseOnOverlayClick={true}
        onRequestClose={hideWelcome}
        style={ModalStyles}
      >
        <Welcome onClose={() => setIsWelcome(false)} />
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
    backgroundColor: "rgba(0, 0, 0, 0.25)"
  },
  content: {
    position: "absolute",
    top: "40px",
    left: "0px",
    right: "auto",
    bottom: "40px",
    border: "",
    background: "black",
    borderRadius: "0 2px 2px 0"
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
