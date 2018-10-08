import React from "react";

const Pad = ({ label, color = "gray", onClick }) => (
  <div className="Pad" style={{ backgroundColor: color }} onClick={onClick}>
    {label}
  </div>
);

export default Pad;
