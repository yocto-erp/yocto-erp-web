import React from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import { useRouteMatch, Route, useHistory, Switch } from "react-router-dom";
import ListInventorySummary from "./components/inventory-summary/ListInventorySummary";
import ListInventory from "./components/inventory/ListInventory";

const ListPage = () => {
  const { path } = useRouteMatch();
  const history = useHistory();

  return (
    <div>
      <Nav tabs>
        <Switch>
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
          <Route
            path={`${path}`}
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
        </Switch>
      </Nav>
      <TabContent>
        <TabPane>
          <Row>
            <Col xl="12" lg="12" md="12" sm="12">
              <Switch>
                <Route
                  exact
                  path={`${path}/summary`}
                  component={ListInventorySummary}
                />
                <Route path={`${path}`} component={ListInventory} />
              </Switch>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

ListPage.propTypes = {};

export default ListPage;
