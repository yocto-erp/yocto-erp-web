import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

const RawHTML = ({ html }) => (
  // eslint-disable-next-line react/no-danger
  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
);

RawHTML.propTypes = {
  html: PropTypes.string.isRequired,
};

export default RawHTML;
