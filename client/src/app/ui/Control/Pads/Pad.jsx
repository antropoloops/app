import React from "react";
import cc from "classcat";

class Pad extends React.Component {
  constructor(props) {
    super(props);
    this.touched = false;
  }

  handlePress(isTouch) {
    // prevent double click on mobile (https://github.com/facebook/react/issues/9809)
    if (isTouch) {
      this.touched = true;
    } else if (this.touched === true) {
      this.touched = false;
      return;
    }
    const pressed = !this.props.pressed;
    const handler = this.props[pressed ? "onPress" : "onRelease"];
    handler && handler(this.props.label);
  }

  render() {
    const { color, touch, image, label, isPressed } = this.props;
    const style = { backgroundColor: color };
    return (
      <button
        className={cc({
          Pad: true,
          pressed: isPressed
        })}
        onTouchStart={touch ? () => this.handlePress(true) : undefined}
        onMouseDown={() => this.handlePress(false)}
      >
        <div className="body" style={style} />
        <div className="label" style={style}>
          {label}
        </div>
      </button>
    );
  }
}
Pad.propTypes = {};

export const EmptyPad = ({ name }) => (
  <button className="Pad" style={{ borderColor: "transparent" }}>
    {name}
  </button>
);

export default Pad;
