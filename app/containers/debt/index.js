import React from "react";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import { Col, Nav, NavItem, Row, TabContent, TabPane } from "reactstrap";
import {
  DEBT_ROOT_PATH,
  DEBT_LIST_ROOT_PATH,
  DEBT_COMMON_ROOT_PATH,
} from "./constants";
import DebtListPage from "./debt/Loadable";
import CommonDebtPage from "./common/Loadable";

function DebtPage() {
  return (
    <div>
      <Nav tabs>
        <>
          <NavItem>
            <NavLink
              activeClassName="active"
              to={DEBT_COMMON_ROOT_PATH}
              className="nav-link"
            >
              Common
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              activeClassName="active"
              to={DEBT_LIST_ROOT_PATH}
              className="nav-link"
            >
              List Debt
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
                <Route
                  component={CommonDebtPage}
                  path={DEBT_COMMON_ROOT_PATH}
                />
              </Switch>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}

DebtPage.propTypes = {};

DebtPage.defaultProps = {};

export default DebtPage;
