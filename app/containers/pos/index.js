import React from "react";
import { Route, Switch } from "react-router-dom";
import { POS_ROOT_PATH } from "./constants";
import { listPage, newPage } from "../../libs/utils/crud.util";
import ListPage from "./ListPage";
import EditPage from "./EditPage";
import CreatePage from "./CreatePage";
import ListPosPage from "./ListPosPage";

const MAIN_PATH = POS_ROOT_PATH;

function PosPage() {
  return (
    <Switch>
      <Route exact path={`${newPage(MAIN_PATH)}`} component={CreatePage} />
      <Route exact path={`${MAIN_PATH}/list`} component={ListPosPage} />
      <Route exact path={`${MAIN_PATH}/:id/edit`} component={EditPage} />
      <Route path={`${listPage(MAIN_PATH)}`} component={ListPage} />
    </Switch>
  );
}

PosPage.propTypes = {};

PosPage.defaultProps = {};

export default PosPage;
