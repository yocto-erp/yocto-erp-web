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

import PropTypes from 'prop-types';
import { INVENTORY_ROOT_PATH } from './constants';
import ListInventorySummary from './components/inventory-summary/ListInventorySummary';
import ListInventory from './components/ListInventory';

const ROOT_PATH = INVENTORY_ROOT_PATH;

const ListPage = ({ history }) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            GOODS RECEIPT/ISSUE
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
            INVENTORY SUMMARY
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col xl="12" lg="12" md="12" sm="12">
              <ListInventory history={history} />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col xl="12" lg="12" md="12" sm="12">
              <ListInventorySummary history={history} />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

ListPage.propTypes = {
  history: PropTypes.any,
};

export default ListPage;
