import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  editPagePattern,
  listPage,
  newPage,
} from "../../../libs/utils/crud.util";
import ListPage from "./ListPage";
import EditPageDebit from "./debit/EditPageDebit";
import CreatePageDebit from "./debit/CreatePageDebit";
import EditPagePaid from "./paid/EditPagePaid";
import CreatePagePaid from "./paid/CreatePagePaid";
import {
  DEBT_DEBIT_ROOT_PATH,
  DEBT_LIST_ROOT_PATH,
  DEBT_PAY_ROOT_PATH,
} from "../constants";

const MAIN_PATH = DEBT_LIST_ROOT_PATH;

function DebtListPage() {
  return (
    <Switch>
      <Route
        exact
        path={`${editPagePattern(DEBT_PAY_ROOT_PATH)}`}
        component={EditPagePaid}
      />
      <Route
        exact
        path={`${newPage(DEBT_PAY_ROOT_PATH)}`}
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
      <Route path={`${listPage(MAIN_PATH)}`} component={ListPage} />
    </Switch>
  );
}

DebtListPage.propTypes = {};

DebtListPage.defaultProps = {};

export default DebtListPage;
