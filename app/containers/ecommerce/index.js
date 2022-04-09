import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  ECOMMERCE_CONFIGURATION_ROOT_PATH,
  ECOMMERCE_PRODUCT_ROOT_PATH,
} from "./constants";

import ECommercialProductPage from "./ecommerce-product/Loadable";

const EcommercePage = () => (
  <Switch>
    <Route
      path={ECOMMERCE_PRODUCT_ROOT_PATH}
      component={ECommercialProductPage}
    />
    <Route
      exact
      path={ECOMMERCE_CONFIGURATION_ROOT_PATH}
      component={() => <h1>Under Developing</h1>}
    />
  </Switch>
);
export default EcommercePage;
