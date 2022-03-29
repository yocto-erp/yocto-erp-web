import React from "react";
import PropTypes from "prop-types";
import chroma from "chroma-js";
import { DEFAULT_TEXT_COLOR } from "../../constants";

const formatTag = color => {
  const customColor = chroma(color || DEFAULT_TEXT_COLOR);
  const backgroundColor = customColor.alpha(0.1).css();
  return {
    backgroundColor,
    color: customColor,
  };
};

const formatTagForLight = data => {
  const color = chroma(data || DEFAULT_TEXT_COLOR);
  return {
    backgroundColor: color,
    color: chroma.contrast(color, "white") > 2 ? "white" : "black",
  };
};

const TagItem = ({ item, background }) => {
  const { label, color } = item;
  return (
    <span
      className="badge"
      style={
        background === "light" ? formatTagForLight(color) : formatTag(color)
      }
    >
      {label}
    </span>
  );
};

TagItem.propTypes = {
  item: PropTypes.object,
  background: PropTypes.oneOf(["light", "dark"]),
};

export default TagItem;
