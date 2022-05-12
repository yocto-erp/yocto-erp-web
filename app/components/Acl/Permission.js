import React from "react";
import PropTypes from "prop-types";
import useUser from "../../libs/hooks/useUser";

const Permission = ({ children, permissions }) => {
  const { isHasAnyPermission } = useUser();
  return isHasAnyPermission({ permission: permissions }) ? (
    <>{children}</>
  ) : null;
};

Permission.propTypes = {
  children: PropTypes.node,
  permissions: PropTypes.array,
};

export default Permission;
