import React from "react";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import { Col, Nav, NavItem, Row, TabContent, TabPane } from "reactstrap";
import {
  COMPANY_ROOT_PATH,
  PARTNER_ROOT_PATH,
  PERSON_ROOT_PATH,
  SUBJECT_ROOT_PATH,
} from "./constants";
import ListPagePerson from "./person/Loadable";
import ListPageCompany from "./company/Loadable";
import SubjectPage from "./subject/Loadable";

function PartnerPage() {
  return (
    <div>
      <Nav tabs>
        <>
          <NavItem>
            <NavLink
              activeClassName="active"
              to={SUBJECT_ROOT_PATH}
              className="nav-link"
            >
              Đối tác
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              activeClassName="active"
              to={PERSON_ROOT_PATH}
              className="nav-link"
            >
              Cá nhân
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              activeClassName="active"
              to={COMPANY_ROOT_PATH}
              className="nav-link"
            >
              Công ty
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
                  from={PARTNER_ROOT_PATH}
                  to={SUBJECT_ROOT_PATH}
                />
                <Route component={ListPagePerson} path={PERSON_ROOT_PATH} />
                <Route component={ListPageCompany} path={COMPANY_ROOT_PATH} />
                <Route component={SubjectPage} path={SUBJECT_ROOT_PATH} />
              </Switch>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}

PartnerPage.propTypes = {};

PartnerPage.defaultProps = {};

export default PartnerPage;
