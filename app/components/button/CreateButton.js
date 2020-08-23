import React from 'react';
import { Button } from 'reactstrap';

const CreateButton = props => (
  <Button {...props} color="primary">
    <i className="fi flaticon-add mr-2" />
    {/* eslint-disable-next-line react/prop-types */}
    {props.children ? props.children : 'Create'}
  </Button>
);

export default CreateButton;
