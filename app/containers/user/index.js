import React from "react";
import { Route, Switch } from "react-router-dom";
import ListPage from "./ListPage";
import { USER_ROOT_PATH } from "./constants";
import DetailPage from "./DetailPage";
import EditPage from "./EditPage";
import { newPage } from "../../libs/utils/crud.util";
import InvitePage from "./InvitePage";

const MAIN_PATH = USER_ROOT_PATH;

function UserPage() {
  return (
    <Switch>
      <Route exact path={`${newPage(MAIN_PATH)}`} component={InvitePage} />
      <Route exact path={`${MAIN_PATH}/:id/view`} component={DetailPage} />
      <Route exact path={`${MAIN_PATH}/:id/edit`} component={EditPage} />
      <Route path={`${MAIN_PATH}`} component={ListPage} />
    </Switch>
  );
}

UserPage.propTypes = {};

UserPage.defaultProps = {};

export default UserPage;
