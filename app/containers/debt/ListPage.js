import React from "react";
import { Col, Nav, NavItem, Row, TabContent, TabPane } from "reactstrap";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import {
  DEBT_COMMON_ROOT_PATH,
  DEBT_LIST_ROOT_PATH,
  DEBT_ROOT_PATH,
} from "./constants";
import messages from "./messages";
import DebtListPage from "./debt/ListPage";
import CommonDebtPage from "./common/Loadable";

const ListPage = () => (
  <div>
    <Nav tabs>
      <>
        <NavItem>
          <NavLink
            activeClassName="active"
            to={DEBT_COMMON_ROOT_PATH}
            className="nav-link"
          >
            <FormattedMessage {...messages.tabCommon} />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            activeClassName="active"
            to={DEBT_LIST_ROOT_PATH}
            className="nav-link"
          >
            <FormattedMessage {...messages.tabDebt} />
          </NavLink>
        </NavItem>
      </>
    </Nav>
    <TabContent>
      <TabPane>
        <Row>
          <Col xl="12" lg="12" md="12" sm="12">
            <Switch>
              <Redirect
                exact
                from={DEBT_ROOT_PATH}
                to={DEBT_COMMON_ROOT_PATH}
              />
              <Route component={DebtListPage} path={DEBT_LIST_ROOT_PATH} />
              <Route component={CommonDebtPage} path={DEBT_COMMON_ROOT_PATH} />
            </Switch>
          </Col>
        </Row>
      </TabPane>
    </TabContent>
  </div>
);

ListPage.propTypes = {};

export default ListPage;
