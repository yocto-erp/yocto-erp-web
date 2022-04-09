import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import paymentPage from "./payment/Loadable";
import TaxPage from "./tax/tax/Loadable";
import TaxSetPage from "./tax/tax-set/Loadable";
import { PAYMENT_ROOT_PATH } from "./payment/constants";
import { FINANCE_ROOT_PATH } from "./constants";
import { TAX_SET_ROOT_PATH } from "./tax/tax-set/constants";
import { TAX_ROOT_PATH } from "./tax/tax/constants";

const IndexPage = () => (
  <Switch>
    <Redirect exact from={FINANCE_ROOT_PATH} to={PAYMENT_ROOT_PATH} />
    <Route path={TAX_SET_ROOT_PATH} component={TaxSetPage} />
    <Route path={TAX_ROOT_PATH} component={TaxPage} />
    <Route path={PAYMENT_ROOT_PATH} component={paymentPage} />
  </Switch>
);
export default IndexPage;
