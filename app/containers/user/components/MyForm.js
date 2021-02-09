import React from 'react';
import PropTypes from 'prop-types';
import Widget from '../../../components/Widget/Widget';

function MyForm({ id }) {
  return <Widget>test {id}</Widget>;
}

MyForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MyForm.defaultProps = {};

export default MyForm;
