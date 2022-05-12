import React from "react";
import { Route, Switch } from "react-router-dom";
import { PROVIDER_ROOT_PATH } from "./constants";
import { listPage, newPage } from "../../libs/utils/crud.util";
import ListPage from "./ListPage";
import EditPage from "./EditPage";
import CreatePage from "./CreatePage";
import ViewPage from "./ViewPage";

const MAIN_PATH = PROVIDER_ROOT_PATH;

function IndexPage() {
  return (
    <Switch>
      <Route exact path={`${newPage(MAIN_PATH)}`} component={CreatePage} />
      <Route exact path={`${MAIN_PATH}/:id/view`} component={ViewPage} />
      <Route exact path={`${MAIN_PATH}/:id/edit`} component={EditPage} />
      <Route path={`${listPage(MAIN_PATH)}`} component={ListPage} />
    </Switch>
  );
}

IndexPage.propTypes = {};

IndexPage.defaultProps = {};

export default IndexPage;
