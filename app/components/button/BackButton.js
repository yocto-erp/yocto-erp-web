import React from 'react';
import { Button } from 'reactstrap';

const BackButton = props => (
  <Button onClick={() => window.history.back()} {...props}>
    <i className="la la-angle-left" />
    {/* eslint-disable-next-line react/prop-types */}
    {props.children ? props.children : 'Back'}
  </Button>
);

BackButton.propTypes = {};

export default BackButton;
