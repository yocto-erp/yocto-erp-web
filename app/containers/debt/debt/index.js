import React from "react";
import { Route, Switch } from "react-router-dom";
import { editPagePattern, newPage } from "../../../libs/utils/crud.util";
import EditPageDebit from "./debit/EditPageDebit";
import CreatePageDebit from "./debit/CreatePageDebit";
import EditPagePaid from "./paid/EditPagePaid";
import CreatePagePaid from "./paid/CreatePagePaid";
import { DEBT_DEBIT_ROOT_PATH, DEBT_PAID_ROOT_PATH } from "../constants";

function indexPage() {
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
    </Switch>
  );
}

indexPage.propTypes = {};

indexPage.defaultProps = {};

export default indexPage;
