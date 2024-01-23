import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { STUDENT_STATUS } from "../constants";
import { listPageMessage } from "../messages";

const StudentStatusView = ({ status }) => {
  switch (status) {
    case STUDENT_STATUS.PENDING:
      return (
        <span className="badge badge-warning">
          <FormattedMessage {...listPageMessage[`status${status}`]} />
        </span>
      );
    case STUDENT_STATUS.ACTIVE:
      return (
        <span className="badge badge-success">
          <FormattedMessage {...listPageMessage[`status${status}`]} />
        </span>
      );
    case STUDENT_STATUS.LEAVE:
      return (
        <span className="badge badge-danger">
          <FormattedMessage {...listPageMessage[`status${status}`]} />
        </span>
      );
    default:
      return <span className="badge badge-secondary">Unknown</span>;
  }
};

StudentStatusView.propTypes = {
  status: PropTypes.number,
};

export default StudentStatusView;
