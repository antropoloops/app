import React from "react";
import PropTypes from "prop-types";
import cxs from "cxs/component";
export { default as Icon } from "./Icon";

export const Json = ({ obj }) => <pre>{JSON.stringify(obj)}</pre>;
Json.propTypes = {
  obj: PropTypes.object
};

export const Button = cxs("button")({
  color: "black",
  display: "block",
  background: "white",
  font: "inherit",
  padding: "0 1em",
  borderRadius: "1em",
  ":hover": {
    textDecoration: "underline"
  }
});

export const Link = cxs("button")({
  color: "white",
  display: "block",
  background: "none",
  font: "inherit",
  border: 0
});
