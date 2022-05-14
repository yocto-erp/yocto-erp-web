import React from "react";
import PropTypes from "prop-types";
import { formatDate } from "../../../libs/utils/date.util";

const DateView = ({ date }) => {
  let rs = "";
  try {
    rs = formatDate(new Date(date));
    // eslint-disable-next-line no-empty
  } catch (e) {}
  return (
    <span className="text-nowrap">
      <i className="fi flaticon-time" /> {rs}
    </span>
  );
};

DateView.propTypes = {
  date: PropTypes.string,
};

export default DateView;
