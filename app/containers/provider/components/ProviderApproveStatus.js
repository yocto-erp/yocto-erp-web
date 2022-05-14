import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { FaCheck, FaTimes } from "react-icons/fa";
import classNames from "classnames";
import messages from "../messages";
import { formatDate } from "../../../libs/utils/date.util";
import UserView from "../../../components/ListWidget/UserView";

const ProviderApproveStatus = ({ provider, size = 12 }) => {
  if (!provider || !provider.approvedBy) {
    return null;
  }
  const { isApproved, approvedBy, approvedDate } = provider;
  const item = isApproved
    ? `formApproveStatusAccept`
    : "formApproveStatusReject";

  return (
    <div>
      <span
        className={classNames("badge mb-1", {
          "badge-success": isApproved,
          "badge-danger": !isApproved,
        })}
        style={{ fontSize: `${size}px` }}
      >
        {isApproved ? <FaCheck size={size} /> : <FaTimes />}{" "}
        <FormattedMessage {...messages[item]} />
      </span>
      <br />
      <UserView user={approvedBy} />
      <br />
      <span>
        <i className="fi flaticon-time" /> {formatDate(new Date(approvedDate))}
      </span>
    </div>
  );
};

ProviderApproveStatus.propTypes = {
  provider: PropTypes.object,
  size: PropTypes.number,
};

export default ProviderApproveStatus;
