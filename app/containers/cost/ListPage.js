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
import { useRouteMatch, Route, useHistory, Switch } from 'react-router-dom';
import ListReceiptVoucher from './ListReceiptVoucher';
import ListPaymentVoucher from './ListPaymentVoucher';

const ListPage = () => {
  const { path } = useRouteMatch();
  const history = useHistory();

  return (
    <div>
      <Nav tabs>
        <Route
          exact
          path={`${path}`}
          render={() => (
            <>
              <NavItem>
                <NavLink className="active">RECEIPT VOUCHER</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => history.push(`${path}/payment`)}>
                  PAYMENT VOUCHER
                </NavLink>
              </NavItem>
            </>
          )}
        />
        <Route
          path={`${path}/payment`}
          render={() => (
            <>
              <NavItem>
                <NavLink onClick={() => history.push(`${path}`)}>
                  RECEIPT VOUCHER
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="active">PAYMENT VOUCHER</NavLink>
              </NavItem>
            </>
          )}
        />
      </Nav>
      <TabContent>
        <TabPane>
          <Row>
            <Col xl="12" lg="12" md="12" sm="12">
              <Switch>
                <Route
                  exact
                  path={`${path}/payment`}
                  component={ListPaymentVoucher}
                />
                <Route path={`${path}`} component={ListReceiptVoucher} />
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
