import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ control }) => <div>{control}</div>;

Select.propTypes = {
  control: PropTypes.any,
};

export default Select;
