import PropTypes from "prop-types";
import React from "react";
import DateView from "../common/date/DateView";

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
        <DateView date={date} />
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
