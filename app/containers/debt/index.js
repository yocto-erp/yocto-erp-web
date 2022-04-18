import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  DEBT_ROOT_PATH,
  DEBT_PAID_ROOT_PATH,
  DEBT_DEBIT_ROOT_PATH,
} from "./constants";

import { editPagePattern, listPage, newPage } from "../../libs/utils/crud.util";

import ListPage from "./ListPage";
import EditPagePaid from "./debt/paid/EditPagePaid";
import CreatePagePaid from "./debt/paid/CreatePagePaid";
import EditPageDebit from "./debt/debit/EditPageDebit";
import CreatePageDebit from "./debt/debit/CreatePageDebit";

function DebtPage() {
  return (
    <Switch>
      <Route
        exact
        path={`${editPagePattern(DEBT_PAID_ROOT_PATH)}`}
        component={EditPagePaid}
      />
      <Route
        exact
        path={`${newPage(DEBT_PAID_ROOT_PATH)}`}
        component={CreatePagePaid}
      />
      <Route
        exact
        path={`${editPagePattern(DEBT_DEBIT_ROOT_PATH)}`}
        component={EditPageDebit}
      />
      <Route
        exact
        path={`${newPage(DEBT_DEBIT_ROOT_PATH)}`}
        component={CreatePageDebit}
      />
      <Route path={`${listPage(DEBT_ROOT_PATH)}`} component={ListPage} />
    </Switch>
  );
}

DebtPage.propTypes = {};

DebtPage.defaultProps = {};

export default DebtPage;
