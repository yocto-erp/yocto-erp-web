import React from "react";
import { Route, Switch } from "react-router-dom";
import { listPage, newPage } from "../../../libs/utils/crud.util";
import ListPage from "./ListPagePerson";
import EditPage from "./EditPagePerson";
import CreatePage from "./CreatePagePerson";
import { PERSON_ROOT_PATH } from "../constants";

const MAIN_PATH = PERSON_ROOT_PATH;

function PersonPage() {
  return (
    <Switch>
      <Route exact path={`${MAIN_PATH}/:id/edit`} component={EditPage} />
      <Route exact path={`${newPage(MAIN_PATH)}`} component={CreatePage} />
      <Route path={`${listPage(MAIN_PATH)}`} component={ListPage} />
    </Switch>
  );
}

PersonPage.propTypes = {};

PersonPage.defaultProps = {};

export default PersonPage;
