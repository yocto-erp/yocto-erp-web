import React, { useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import { Route } from "react-router-dom";
import ListPagePerson from "./person/ListPagePerson";
import ListPageCompany from "./company/ListPageCompany";
import SubjectPage from "./subject/Loadable";

const ListPage = () => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <div>
      <Nav tabs>
        <>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle("1");
              }}
            >
              Khách Hàng
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggle("2");
              }}
            >
              Công Ty
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "3" })}
              onClick={() => {
                toggle("3");
              }}
            >
              Subject
            </NavLink>
          </NavItem>
        </>
      </Nav>
      <TabContent>
        <TabPane>
          <Row>
            <Col xl="12" lg="12" md="12" sm="12">
              {/* eslint-disable-next-line no-nested-ternary */}
              {activeTab === "1" ? (
                <Route component={ListPagePerson} />
              ) : activeTab === "2" ? (
                <Route component={ListPageCompany} />
              ) : (
                <Route component={SubjectPage} />
              )}
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

ListPage.propTypes = {};

export default ListPage;
