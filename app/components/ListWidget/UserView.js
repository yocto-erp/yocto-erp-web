import React from "react";
import PropTypes from "prop-types";

const UserView = ({ user }) => {
  if (!user) return null;
  return (
    <span className="text-nowrap">
      <i className="fi flaticon-user" /> {user.displayName || user.email}
    </span>
  );
};

UserView.propTypes = {
  user: PropTypes.object,
};

export default UserView;
