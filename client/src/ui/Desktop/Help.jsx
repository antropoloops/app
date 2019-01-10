import React from "react";
import Joyride from "react-joyride";

const steps = [
  {
    target: "#Connection",
    content:
      "Has creado una sesión. Puedes cambiarla o conectar con otros dispositivos aquí",
    placement: "bottom",
    disableBeacon: true
  },
  {
    target: "#Keyboard",
    content:
      "Usa el teclado para lanzar los sonidos. También puedes usar MIDI o un MakeyMakey!",
    placement: "top",
    disableBeacon: true
  },
  {
    target: "#Transport",
    content: "Ponlo en pantalla completa o abre los controles",
    disableBeacon: true
  }
];

const locale = {
  back: "Anterior",
  close: "Cerrar",
  last: "Ok, lo he pillado",
  next: "Siguiente",
  skip: "Salir"
};

const options = {
  arrowColor: "#111",
  backgroundColor: "#111",
  beaconSize: 70,
  overlayColor: "rgba(255, 255, 255, 0.5)",
  primaryColor: "#000",
  spotlightShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
  textColor: "white",
  width: undefined,
  zIndex: 100
};

const styles = {
  options,
  tooltip: { fontSize: 14, fontFamily: "system" },
  buttonSkip: { fontSize: 12 }
};

export default ({ run, onStop }) => (
  <Joyride
    callback={state => state.action === "reset" && onStop()}
    run={run}
    locale={locale}
    styles={styles}
    showProgress={false}
    showSkipButton={true}
    continuous={true}
    steps={steps}
  />
);
