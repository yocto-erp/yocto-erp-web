import React from "react";
import { Switch } from "react-router-dom";
import { PURCHASE_ORDER_ROOT_PATH } from "./constants";
import { listPage, newPage } from "../../../libs/utils/crud.util";
import ListPage from "./ListPage";
import CreatePage from "./CreatePage";
import EditPage from "./EditPage";
import { PERMISSION } from "../../../components/Acl/constants";
import ProtectedRoute from "../../../components/route/ProtectedRoute";

const MAIN_PATH = PURCHASE_ORDER_ROOT_PATH;

function PurchasePage() {
  return (
    <Switch>
      <ProtectedRoute
        exact
        path={`${newPage(MAIN_PATH)}`}
        permissions={[PERMISSION.ORDER.PURCHASE.CREATE]}
      >
        <CreatePage />
      </ProtectedRoute>

      <ProtectedRoute
        exact
        path={`${MAIN_PATH}/:id/edit`}
        permissions={[PERMISSION.ORDER.PURCHASE.UPDATE]}
      >
        <EditPage />
      </ProtectedRoute>
      <ProtectedRoute
        path={listPage(MAIN_PATH)}
        permissions={[PERMISSION.ORDER.PURCHASE.READ]}
      >
        <ListPage />
      </ProtectedRoute>
    </Switch>
  );
}

PurchasePage.propTypes = {};

PurchasePage.defaultProps = {};

export default PurchasePage;
