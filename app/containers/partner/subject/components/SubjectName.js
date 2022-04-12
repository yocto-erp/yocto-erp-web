import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { SUBJECT_TYPE } from "../constants";

const SubjectName = ({ item }) => {
  if (!item) return null;
  return (
    <strong>
      <i
        className={classnames("fa fa-fw", {
          "fa-user-o": Number(item.type) === SUBJECT_TYPE.PERSONAL,
          "fa-building-o": Number(item.type) === SUBJECT_TYPE.COMPANY,
        })}
      />{" "}
      {item.name}
    </strong>
  );
};

SubjectName.propTypes = {
  item: PropTypes.object,
};

export default SubjectName;
