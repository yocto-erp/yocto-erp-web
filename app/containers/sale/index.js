import React from "react";
import { Route, Switch } from "react-router-dom";
import { SHOP_ROOT_PATH } from "./shop/constants";
import ShopPage from "./shop/Loadable";
import PosPage from "./pos/Loadable";
import { POS_ROOT_PATH } from "./pos/constants";
import { SALE_CONFIGURE_PATH } from "./constants";
import SaleConfigurePage from "./SaleConfigurePage";

function IndexPage() {
  return (
    <Switch>
      <Route path={SHOP_ROOT_PATH} component={ShopPage} />
      <Route path={POS_ROOT_PATH} component={PosPage} />
      <Route exact path={SALE_CONFIGURE_PATH} component={SaleConfigurePage} />
    </Switch>
  );
}

IndexPage.propTypes = {};

IndexPage.defaultProps = {};

export default IndexPage;
