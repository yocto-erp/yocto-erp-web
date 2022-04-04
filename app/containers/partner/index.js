import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  COMPANY_ROOT_PATH,
  PARTNER_ROOT_PATH,
  PERSON_ROOT_PATH,
} from "./constants";
import { listPage, newPage } from "../../libs/utils/crud.util";
import ListPage from "./ListPage";
import CreatePagePerson from "./person/CreatePagePerson";
import EditPagePerson from "./person/EditPagePerson";
import EditPageCompany from "./company/EditPageCompany";
import CreatePageCompany from "./company/CreatePageCompany";

const MAIN_PATH = PARTNER_ROOT_PATH;

function PartnerPage() {
  return (
    <Switch>
      <Route
        exact
        path={`${PERSON_ROOT_PATH}/:id/edit`}
        component={EditPagePerson}
      />
      <Route
        exact
        path={`${newPage(PERSON_ROOT_PATH)}`}
        component={CreatePagePerson}
      />
      <Route
        exact
        path={`${COMPANY_ROOT_PATH}/:id/edit`}
        component={EditPageCompany}
      />
      <Route
        exact
        path={`${newPage(COMPANY_ROOT_PATH)}`}
        component={CreatePageCompany}
      />
      <Route path={`${listPage(MAIN_PATH)}`} component={ListPage} />
    </Switch>
  );
}

PartnerPage.propTypes = {};

PartnerPage.defaultProps = {};

export default PartnerPage;
