import React from "react";
import { Route, Switch } from "react-router-dom";
import { listPage } from "../../../libs/utils/crud.util";
import ListPage from "./ListPage";
import { DEBT_COMMON_ROOT_PATH } from "../constants";

const MAIN_PATH = DEBT_COMMON_ROOT_PATH;

function CommonDebtPage() {
  return (
    <Switch>
      <Route path={`${listPage(MAIN_PATH)}`} component={ListPage} />
    </Switch>
  );
}

CommonDebtPage.propTypes = {};

CommonDebtPage.defaultProps = {};

export default CommonDebtPage;
