import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const ShortText = ({ text, maxWidth = 80, className, ...props }) => (
  <span
    className={classnames(className, "d-inline-block")}
    {...props}
    style={{ maxWidth, overflow: "hidden", textOverflow: "ellipsis" }}
    title={text}
  >
    {text}
  </span>
);

ShortText.propTypes = {
  text: PropTypes.string,
  maxWidth: PropTypes.number,
  className: PropTypes.string,
};

export default ShortText;
