import * as screen from "screenfull";

export default { changeFullscreen, onChange };

export function changeFullscreen(isFullscreen) {
  if (screen.enabled) {
    if (isFullscreen) screen.request();
    else screen.exit();
  }
}

export function onChange(callback) {
  if (screen.enabled) {
    screen.on("change", () => callback(screen.isFullscreen));
  }
}
