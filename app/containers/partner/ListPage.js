import React, { useState } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from 'reactstrap';
import classnames from 'classnames';
import { Route } from 'react-router-dom';
import ListPagePerson from './person/ListPagePerson';
import ListPageCompany from './company/ListPageCompany';

const ListPage = () => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <div>
      <Nav tabs>
        <>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => {
                toggle('1');
              }}
            >
              Khách Hàng
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => {
                toggle('2');
              }}
            >
              Công Ty
            </NavLink>
          </NavItem>
        </>
      </Nav>
      <TabContent>
        <TabPane>
          <Row>
            <Col xl="12" lg="12" md="12" sm="12">
              {activeTab === '1' ? (
                <Route component={ListPagePerson} />
              ) : (
                <Route component={ListPageCompany} />
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
