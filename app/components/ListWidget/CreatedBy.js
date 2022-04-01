import PropTypes from "prop-types";
import React from "react";
import { formatDate } from "../../libs/utils/date.util";

const CreatedBy = ({ user, date }) => {
  const userDisplay = user ? (
    <span className="text-nowrap">
      <i className="fi flaticon-user" /> {user.displayName || user.email}
    </span>
  ) : (
    "Unknown"
  );
  let dateDisplay = "";
  if (date && date.length) {
    dateDisplay = (
      <>
        <br />
        <span className="text-nowrap">
          <i className="fi flaticon-time" /> {formatDate(new Date(date))}
        </span>
      </>
    );
  }
  return (
    <>
      {userDisplay}
      {dateDisplay}
    </>
  );
};

CreatedBy.propTypes = {
  user: PropTypes.object,
  date: PropTypes.string,
};

export default CreatedBy;
