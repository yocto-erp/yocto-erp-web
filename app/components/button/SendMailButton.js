import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { ButtonTypes } from './constants';

const SendMailButton = props => (
  <Button {...props} color={props.color ? props.color : 'success'}>
    <i className="las la-envelope-open-text mr-2" />
    {/* eslint-disable-next-line react/prop-types */}
    {props.children ? props.children : 'Send Mail'}
  </Button>
);

SendMailButton.propsType = ButtonTypes;

SendMailButton.propTypes = {
  color: PropTypes.string,
};

export default SendMailButton;
