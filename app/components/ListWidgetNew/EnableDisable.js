import React from 'react';
import PropTypes from 'prop-types';

const EnableDisable = ({ value }) =>
  value ? (
    <span className="badge badge-primary">ENABLE</span>
  ) : (
    <span className="badge badge-secondary">DISABLE</span>
  );

EnableDisable.propTypes = {
  value: PropTypes.bool,
};

export default EnableDisable;
