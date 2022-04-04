import React from "react";
import { Route, Switch } from "react-router-dom";
import { listPage, newPage } from "../../../libs/utils/crud.util";
import ListPage from "./ListPage";
import { SUBJECT_ROOT_PATH } from "../constants";
import EditPage from "./EditPage";
import CreatePage from "./CreatePage";

const MAIN_PATH = SUBJECT_ROOT_PATH;

function PartnerPage() {
  return (
    <Switch>
      <Route exact path={`${MAIN_PATH}/:id/edit`} component={EditPage} />
      <Route exact path={`${newPage(MAIN_PATH)}`} component={CreatePage} />
      <Route path={`${listPage(MAIN_PATH)}`} component={ListPage} />
    </Switch>
  );
}

PartnerPage.propTypes = {};

PartnerPage.defaultProps = {};

export default PartnerPage;
