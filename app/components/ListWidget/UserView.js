import React from "react";
import PropTypes from "prop-types";

const UserView = ({ user }) => {
  if (!user) return null;
  return (
    <span className="text-nowrap">
      <i className="fa fa-user-o fa-fw" /> {user.displayName || user.email}
    </span>
  );
};

UserView.propTypes = {
  user: PropTypes.object,
};

export default UserView;
