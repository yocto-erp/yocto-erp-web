import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { PROVIDER_STATUS } from "../constants";
import messages from "../messages";

const ProviderStatus = ({ status }) => {
  let className = "";
  let item = `providerStatus${status}`;
  switch (status) {
    case PROVIDER_STATUS.PROCESSING:
      className = "badge badge-info";
      break;
    case PROVIDER_STATUS.DONE:
      className = "badge badge-primary";
      break;
    case PROVIDER_STATUS.CANCEL:
      className = "badge badge-danger";
      break;
    default:
      className = "badge badge-secondary";
      item = "providerStatus1";
      break;
  }
  return (
    <span className={className}>
      <FormattedMessage {...messages[item]} />
    </span>
  );
};

ProviderStatus.propTypes = {
  status: PropTypes.number,
};

export default ProviderStatus;
