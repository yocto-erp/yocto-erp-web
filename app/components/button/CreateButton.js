import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { ButtonTypes } from './constants';

const CreateButton = props => (
  <Button {...props} color={props.color ? props.color : 'primary'}>
    <i className={props.icon ? `${props.icon} mr-2` : 'las la-plus mr-2'} />
    {/* eslint-disable-next-line react/prop-types */}
    {props.children ? props.children : 'Create'}
  </Button>
);

CreateButton.propsType = ButtonTypes;

CreateButton.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string,
};

export default CreateButton;
