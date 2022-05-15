import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import useUser from "../../libs/hooks/useUser";
import NotFound from "../../containers/NotFoundPage";

const ProtectedRoute = ({ children, permissions, ...rest }) => {
  const { isHasAnyPermission } = useUser();
  return (
    <Route
      {...rest}
      render={() =>
        isHasAnyPermission({ permission: permissions }) ? (
          children
        ) : (
          <NotFound />
        )
      }
    />
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  permissions: PropTypes.array,
};

export default ProtectedRoute;
