import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const P = styled.p`
  margin-bottom: 0;
`;
const ErrorMessage = ({ errors }) => (
  <div className="">
    <h4 className="alert-heading">
      <i className="fa fa-warning" /> Error
    </h4>
    <P>{errors.map(e => e.message).join(" ")}</P>
  </div>
);

ErrorMessage.propTypes = {
  errors: PropTypes.array,
};

export default ErrorMessage;
