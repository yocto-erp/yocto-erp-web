import React from "react";
import { Route, Switch } from "react-router-dom";
import "styles/theme.scss";
import "overlayscrollbars/css/OverlayScrollbars.css";
import UserProductPage from "./shop/UserProductPage/Loadable";
import UserOrderPage from "./shop/UserOrderPage/Loadable";
import FormViewPage from "./form/FormViewPage";
import FormRegisterInfoPage from "./form/FormRegisterInfoPage/FormRegisterInfoPage";

export default function PublicRoute() {
  return (
    <>
      <Switch>
        <Route path="/cpm/:publicId/product" component={UserProductPage} />
        <Route path="/cpm/:publicId/order" component={UserOrderPage} />
        <Route path="/cpm/:publicId/form" exact component={FormViewPage} />
        <Route
          path="/cpm/:publicId/register"
          exact
          component={FormRegisterInfoPage}
        />
      </Switch>
    </>
  );
}
