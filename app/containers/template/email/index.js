import React from "react";
import { Route, Switch } from "react-router-dom";
import { TEMPLATE_EMAIL_ROOT_PATH } from "../constants";
import { listPage, newPage } from "../../../libs/utils/crud.util";
import ListPage from "./ListPage";
import EditPage from "./EditPage";
import CreatePage from "./CreatePage";

const MAIN_PATH = TEMPLATE_EMAIL_ROOT_PATH;

function TemplatePage() {
  return (
    <Switch>
      <Route exact path={`${newPage(MAIN_PATH)}`} component={CreatePage} />
      <Route exact path={`${MAIN_PATH}/:id/edit`} component={EditPage} />
      <Route path={`${listPage(MAIN_PATH)}`} component={ListPage} />
    </Switch>
  );
}

TemplatePage.propTypes = {};

TemplatePage.defaultProps = {};

export default TemplatePage;
