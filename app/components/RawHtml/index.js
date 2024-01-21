import React from "react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";

const RawHTML = ({ html, ...props }) => (
  /* eslint-disable react/no-danger */
  <div
    {...props}
    dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(html, {
        ADD_TAGS: ["iframe"],
        ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
      }),
    }}
  />
);

RawHTML.propTypes = {
  html: PropTypes.string,
  ALLOWED_TAGS: PropTypes.array,
};

export default RawHTML;
