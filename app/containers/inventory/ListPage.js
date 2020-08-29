import React from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from 'reactstrap';
import { useRouteMatch, Route, useHistory } from 'react-router-dom';
import ListInventorySummary from './components/inventory-summary/ListInventorySummary';
import ListInventory from './components/ListInventory';

const ListPage = () => {
  const { path } = useRouteMatch();
  const history = useHistory();

  return (
    <div>
      <Nav tabs>
        <Route
          path={`${path}`}
          exact
          render={() => (
            <>
              <NavItem>
                <NavLink className="active">GOODS RECEIPT/ISSUE</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => history.push(`${path}/summary`)}>
                  INVENTORY SUMMARY
                </NavLink>
              </NavItem>
            </>
          )}
        />
        <Route
          path={`${path}/summary`}
          render={() => (
            <>
              <NavItem>
                <NavLink onClick={() => history.push(`${path}`)}>
                  GOODS RECEIPT/ISSUE
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="active">INVENTORY SUMMARY</NavLink>
              </NavItem>
            </>
          )}
        />
      </Nav>
      <TabContent>
        <TabPane>
          <Row>
            <Col xl="12" lg="12" md="12" sm="12">
              <Route exact path={`${path}`} component={ListInventory} />
              <Route
                exact
                path={`${path}/summary`}
                component={ListInventorySummary}
              />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

ListPage.propTypes = {};

export default ListPage;
