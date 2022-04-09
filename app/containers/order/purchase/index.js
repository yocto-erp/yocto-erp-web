import React from "react";
import { Route, Switch } from "react-router-dom";
import { PURCHASE_ORDER_ROOT_PATH } from "./constants";
import { listPage, newPage } from "../../../libs/utils/crud.util";
import ListPage from "./ListPage";
import CreatePage from "./CreatePage";
import EditPage from "./EditPage";

const MAIN_PATH = PURCHASE_ORDER_ROOT_PATH;

function PurchasePage() {
  return (
    <Switch>
      <Route exact path={`${newPage(MAIN_PATH)}`} component={CreatePage} />
      <Route exact path={`${MAIN_PATH}/:id/edit`} component={EditPage} />
      <Route path={`${listPage(MAIN_PATH)}`} component={ListPage} />
    </Switch>
  );
}

PurchasePage.propTypes = {};

PurchasePage.defaultProps = {};

export default PurchasePage;
