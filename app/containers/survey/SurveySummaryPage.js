import React, { useEffect, useMemo } from 'react';
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
import { SurveyContext } from './constants';
import SurveyImportRaw from './SurveyImportRaw';
import SurveyExplorePage from './SurveyExplorePage';

const cpacImg = require('./CPAC_2020.png');
const mnaLogo = require('./MnA_logo.jpg');
const wat = require('./The_Washington_Times.png');

const SurveySummary = () => {
  const { path, url } = useRouteMatch();
  const history = useHistory();

  const { id } = useParams();
  const { language = 'en' } = useSearchQuery();

  const {
    state: { errors, resp },
    exec,
  } = useApi(() => surveyApi.read(id, language));

  const {
    state: { resp: surveyQuestions },
    exec: execSurveyQuestion,
  } = useApi(() => surveyApi.readSurveyQuestion(id));

  React.useEffect(() => {
    exec();
    execSurveyQuestion();
  }, []);

  useEffect(() => {
    exec().then();
  }, [id]);

  const PATH_SUMMARY = React.useMemo(
    () => ({
      PERSON_EXPLORE: `${path}/explore`,
      PERSON_SUMMARY: `${path}/person`,
      SURVEY_CHART: `${path}/chart`,
      QUESTION_SUMMARY: `${path}/question`,
      ANSWER_IMPORT: `${path}/import`,
    }),
    [path],
  );

  const surveyContextValue = useMemo(
    () => ({ survey: resp, language, surveyQuestions }),
    [resp, language, surveyQuestions],
  );

  const route = React.useCallback(
    routeItem => (
      <>
        <NavItem>
          <NavLink
            className={classNames({
              active: routeItem === PATH_SUMMARY.PERSON_EXPLORE,
            })}
            onClick={() =>
              routeItem !== PATH_SUMMARY.PERSON_EXPLORE &&
              history.push(`${url}/explore`)
            }
          >
            Vote Explore
          </NavLink>
        </NavItem>
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
        <NavItem>
          <NavLink
            className={classNames({
              active: routeItem === PATH_SUMMARY.ANSWER_IMPORT,
            })}
            onClick={() =>
              routeItem !== PATH_SUMMARY.ANSWER_IMPORT &&
              history.push(`${url}/import`)
            }
          >
            Import Raw Data
          </NavLink>
        </NavItem>
      </>
    ),
    [PATH_SUMMARY, url],
  );

  const tabPane = React.useMemo(
    () => (
      <TabPane>
        <Row>
          <Col xl="12" lg="12" md="12" sm="12">
            <Switch>
              <Route
                path={PATH_SUMMARY.PERSON_EXPLORE}
                component={SurveyExplorePage}
              />
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
                exact
                path={PATH_SUMMARY.ANSWER_IMPORT}
                component={SurveyImportRaw}
              />
              <Route
                path={PATH_SUMMARY.QUESTION_SUMMARY}
                component={SurveyPersonAnswerPage}
              />
            </Switch>
          </Col>
        </Row>
      </TabPane>
    ),
    [],
  );

  if (!resp && errors && errors.length) {
    return <h1>Invalid Survey</h1>;
  }

  return (
    <SurveyContext.Provider value={surveyContextValue}>
      <div className="row justify-content-center align-content-center mt-3">
        <div className="col-md-4 text-center">
          <img src={cpacImg} alt="cpag" />
        </div>
        <div className="col-md-4 text-center">
          <img src={mnaLogo} alt="cpag" />
        </div>
        <div className="col-md-4 text-center">
          <img src={wat} alt="cpag" />
        </div>
      </div>
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
              path={PATH_SUMMARY.PERSON_EXPLORE}
              render={() => route(PATH_SUMMARY.PERSON_EXPLORE)}
            />
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
            <Route
              exact
              path={PATH_SUMMARY.ANSWER_IMPORT}
              render={() => route(PATH_SUMMARY.ANSWER_IMPORT)}
            />
          </Switch>
        </Nav>
        <TabContent>{tabPane}</TabContent>
      </div>
    </SurveyContext.Provider>
  );
};

SurveySummary.propTypes = {};

export default SurveySummary;
