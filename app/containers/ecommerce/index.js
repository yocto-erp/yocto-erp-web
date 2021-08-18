import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  ECOMMERCE_CONFIGURATION_ROOT_PATH,
  ECOMMERCE_POS_PATH,
  ECOMMERCE_PRODUCT_ROOT_PATH,
} from './constants';

import ECommercialProductPage from './ecommerce-product/Loadable';
import ECommerceSetting from './eCommerceSetting/ECommerceSetting';
import POS from './pos/POS';

const EcommercePage = () => (
  <Switch>
    <Route
      path={ECOMMERCE_PRODUCT_ROOT_PATH}
      component={ECommercialProductPage}
    />
    <Route
      exact
      path={ECOMMERCE_CONFIGURATION_ROOT_PATH}
      component={ECommerceSetting}
    />
    <Route exact path={ECOMMERCE_POS_PATH} component={POS} />
  </Switch>
);
export default EcommercePage;
