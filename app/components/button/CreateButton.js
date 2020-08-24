import React from 'react';
import { Button } from 'reactstrap';
import { ButtonTypes } from './constants';

const CreateButton = props => (
  <Button {...props} color="primary">
    <i className="las la-plus mr-2" />
    {/* eslint-disable-next-line react/prop-types */}
    {props.children ? props.children : 'Create'}
  </Button>
);

CreateButton.propsType = ButtonTypes;

export default CreateButton;
