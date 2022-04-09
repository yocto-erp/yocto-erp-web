import React from "react";
import { Route, Switch } from "react-router-dom";
import { listPage } from "../../../libs/utils/crud.util";
import ListPage from "./ListPage";
import { PAYMENT_ROOT_PATH } from "./constants";

const MAIN_PATH = PAYMENT_ROOT_PATH;

function indexPage() {
  return (
    <Switch>
      <Route path={`${listPage(MAIN_PATH)}`} component={ListPage} />
    </Switch>
  );
}

indexPage.propTypes = {};

indexPage.defaultProps = {};

export default indexPage;
