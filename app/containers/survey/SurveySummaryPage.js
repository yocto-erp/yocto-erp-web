import React from 'react';
import {
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import SurveyResultPage from './SurveyResultPage';
import SurveyChartPage from './SurveyChartPage';
import QuestionSummaryPage from './QuestionSummaryPage';
import SurveyPersonAnswerPage from './SurveyPersonAnswerPage';

const SurveySummary = props => {
  const { path, url } = useRouteMatch();
  const history = useHistory();
  console.log(path, url);

  return (
    <div className="m-4">
      <Nav tabs>
        <Switch>
          <Route
            exact
            path={`${path}/person`}
            render={() => (
              <>
                <NavItem>
                  <NavLink className="active">Person Summary</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={() => history.push(`${url}/question`)}>
                    Question Summary
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={() => history.push(`${url}/answer`)}>
                    Person Answer Summary
                  </NavLink>
                </NavItem>
              </>
            )}
          />
          <Route
            exact
            path={`${path}/question`}
            render={() => (
              <>
                <NavItem>
                  <NavLink onClick={() => history.push(`${url}/person`)}>
                    Person Summary
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="active">Question Summary</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={() => history.push(`${url}/answer`)}>
                    Person Answer Summary
                  </NavLink>
                </NavItem>
              </>
            )}
          />
          <Route
            exact
            path={`${path}/answer`}
            render={() => (
              <>
                <NavItem>
                  <NavLink onClick={() => history.push(`${url}/person`)}>
                    Person Summary
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={() => history.push(`${url}/question`)}>
                    Question Summary
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="active">Person Answer Summary</NavLink>
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
                <Route path={`${path}/person`} component={SurveyResultPage} />
                <Route
                  exact
                  path={`${path}/question`}
                  component={QuestionSummaryPage}
                />
                <Route
                  path={`${path}/answer`}
                  component={SurveyPersonAnswerPage}
                />
              </Switch>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

SurveySummary.propTypes = {};

export default SurveySummary;
