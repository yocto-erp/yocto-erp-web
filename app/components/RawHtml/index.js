import React from "react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";

const RawHTML = ({ html, ...props }) => (
  /* eslint-disable react/no-danger */
  <div
    {...props}
    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
  />
);

RawHTML.propTypes = {
  html: PropTypes.string,
};

export default RawHTML;
