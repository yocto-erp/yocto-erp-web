import React, { useEffect } from 'react';
import {
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap';
import {
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import classNames from 'classnames';
import SurveyResultPage from './SurveyResultPage';
import SurveyPersonAnswerPage from './SurveyPersonAnswerPage';
import SurveyChartPage from './SurveyChartPage';
import surveyApi from '../../libs/apis/survey/survey.api';
import { useApi } from '../../libs/hooks/useApi';
import { useSearchQuery } from '../../libs/hooks/useSearchQuery';

const SurveySummary = () => {
  const { path, url } = useRouteMatch();
  const history = useHistory();
  console.log(path, url);

  const { id } = useParams();
  const { language = 'en' } = useSearchQuery();

  const {
    state: { errors, resp },
    exec,
  } = useApi(() => surveyApi.read(id, language));

  useEffect(() => {
    exec().then();
  }, [id]);

  const PATH_SUMMARY = React.useMemo(
    () => ({
      PERSON_SUMMARY: `${path}/person`,
      SURVEY_CHART: `${path}/chart`,
      QUESTION_SUMMARY: `${path}/question`,
    }),
    [path],
  );

  const route = React.useCallback(
    routeItem => (
      <>
        <NavItem>
          <NavLink
            className={classNames({
              active: routeItem === PATH_SUMMARY.PERSON_SUMMARY,
            })}
            onClick={() =>
              routeItem !== PATH_SUMMARY.PERSON_SUMMARY &&
              history.push(`${url}/person?language=${language}`)
            }
          >
            Vote Summary
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classNames({
              active: routeItem === PATH_SUMMARY.SURVEY_CHART,
            })}
            onClick={() =>
              routeItem !== PATH_SUMMARY.SURVEY_CHART &&
              history.push(`${url}/chart?language=${language}`)
            }
          >
            Vote Chart
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classNames({
              active: routeItem === PATH_SUMMARY.QUESTION_SUMMARY,
            })}
            onClick={() =>
              routeItem !== PATH_SUMMARY.QUESTION_SUMMARY &&
              history.push(`${url}/question?language=${language}`)
            }
          >
            Question/Answer Summary
          </NavLink>
        </NavItem>
      </>
    ),
    [PATH_SUMMARY, url],
  );

  if (!resp && errors && errors.length) {
    return <h1>Invalid Survey</h1>;
  }

  return (
    <div className="m-4">
      {resp ? (
        <h1 className="mb-2 text-center">
          {resp.name}
          <br />
          {resp.remark ? (
            <small className="text-muted">{resp.remark}</small>
          ) : null}
        </h1>
      ) : null}
      <Nav tabs>
        <Switch>
          <Route
            exact
            path={PATH_SUMMARY.PERSON_SUMMARY}
            render={() => route(PATH_SUMMARY.PERSON_SUMMARY)}
          />
          <Route
            exact
            path={PATH_SUMMARY.SURVEY_CHART}
            render={() => route(PATH_SUMMARY.SURVEY_CHART)}
          />
          <Route
            exact
            path={PATH_SUMMARY.QUESTION_SUMMARY}
            render={() => route(PATH_SUMMARY.QUESTION_SUMMARY)}
          />
        </Switch>
      </Nav>
      <TabContent>
        <TabPane>
          <Row>
            <Col xl="12" lg="12" md="12" sm="12">
              <Switch>
                <Route
                  path={PATH_SUMMARY.PERSON_SUMMARY}
                  component={SurveyResultPage}
                />
                <Route
                  exact
                  path={PATH_SUMMARY.SURVEY_CHART}
                  component={SurveyChartPage}
                />
                <Route
                  path={PATH_SUMMARY.QUESTION_SUMMARY}
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
