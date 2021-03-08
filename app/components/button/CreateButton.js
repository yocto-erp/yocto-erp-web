import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { ButtonTypes } from './constants';

const CreateButton = props => (
  <Button {...props} color={props.color ? props.color : 'primary'}>
    <i className={props.icon ? `${props.icon}` : 'las la-plus'} />
    {/* eslint-disable-next-line react/prop-types */}
    <span className="d-sm-none d-md-inline-block ml-2">
      {props.children ? props.children : 'Create'}
    </span>
  </Button>
);

CreateButton.propsType = ButtonTypes;

CreateButton.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node,
};

export default CreateButton;
