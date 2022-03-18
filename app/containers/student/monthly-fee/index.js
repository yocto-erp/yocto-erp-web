import React from "react";
import { Route, Switch } from "react-router-dom";
import { STUDENT_MONTHLY_ROOT_PATH } from "./constants";
import { listPage, newPage } from "../../../libs/utils/crud.util";
import ListPage from "./ListPage";
import EditPage from "./EditPage";
import CreatePage from "./CreatePage";
import PaidPage from "./PaidPage";

const MAIN_PATH = STUDENT_MONTHLY_ROOT_PATH;

function WarehousePage() {
  return (
    <Switch>
      <Route exact path={`${newPage(MAIN_PATH)}`} component={CreatePage} />
      <Route exact path={`${MAIN_PATH}/:id/edit`} component={EditPage} />
      <Route exact path={`${MAIN_PATH}/:id/paid`} component={PaidPage} />
      <Route path={`${listPage(MAIN_PATH)}`} component={ListPage} />
    </Switch>
  );
}

WarehousePage.propTypes = {};

WarehousePage.defaultProps = {};

export default WarehousePage;
