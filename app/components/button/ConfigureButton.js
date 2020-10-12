import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { ButtonTypes } from './constants';

const ConfigureButton = props => (
  <Button {...props} color={props.color ? props.color : 'primary'}>
    {/* eslint-disable-next-line react/prop-types */}
    {props.children ? props.children : 'Configure'}
  </Button>
);

ConfigureButton.propsType = ButtonTypes;

ConfigureButton.propTypes = {
  color: PropTypes.string,
};

export default ConfigureButton;
