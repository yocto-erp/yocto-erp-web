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
import { FormattedMessage } from "react-intl";
import ListInventorySummary from "./components/inventory-summary/ListInventorySummary";
import ListInventory from "./components/inventory/ListInventory";
import { inventoryMessages } from "./messages";

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
                    <FormattedMessage {...inventoryMessages.title} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="active">
                    <FormattedMessage {...inventoryMessages.inventoryTitle} />
                  </NavLink>
                </NavItem>
              </>
            )}
          />
          <Route
            path={`${path}`}
            render={() => (
              <>
                <NavItem>
                  <NavLink className="active">
                    <FormattedMessage {...inventoryMessages.title} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={() => history.push(`${path}/summary`)}>
                    <FormattedMessage {...inventoryMessages.inventoryTitle} />
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
