import React from "react";
import { Route, Switch } from "react-router-dom";
import ListPage from "./ListPage";
import { USER_ROOT_PATH } from "./constants";
import DetailPage from "./DetailPage";
import { newPage } from "../../libs/utils/crud.util";
import InvitePage from "./InvitePage";
import ProfilePage from "./ProfilePage";
import ProtectedRoute from "../../components/route/ProtectedRoute";
import { PERMISSION } from "../../components/Acl/constants";

const MAIN_PATH = USER_ROOT_PATH;

function UserPage() {
  return (
    <Switch>
      <Route exact path={`${MAIN_PATH}/profile`} component={ProfilePage} />
      <ProtectedRoute
        exact
        path={`${newPage(MAIN_PATH)}`}
        permissions={[PERMISSION.USER.UPDATE]}
      >
        <InvitePage />
      </ProtectedRoute>
      <ProtectedRoute
        exact
        path={`${MAIN_PATH}/:id/edit`}
        permissions={[PERMISSION.USER.UPDATE]}
      >
        <DetailPage />
      </ProtectedRoute>
      <Route path={`${MAIN_PATH}`} component={ListPage} />
    </Switch>
  );
}

UserPage.propTypes = {};

UserPage.defaultProps = {};

export default UserPage;
