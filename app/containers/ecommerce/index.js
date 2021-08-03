import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ECOMMERCE_ROOT_PATH } from './constants';

import ECommercialProductPage from './ecommerce-product/Loadable';

const EcommercePage = () => (
  <Switch>
    <Route path={ECOMMERCE_ROOT_PATH} component={ECommercialProductPage} />
  </Switch>
);
export default EcommercePage;
