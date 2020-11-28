import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../../libs/hooks/useApi';
import surveyApi from '../../libs/apis/survey/survey.api';
import QuestionChart from './components/QuestionChart';

const SurveyChartPage = props => {
  const { id } = useParams();
  const {
    state: { resp },
    exec,
  } = useApi(() => surveyApi.readSurveyQuestion(id));

  const [charts, setCharts] = useState({});

  const showChart = useCallback(
    (questionId, isShow) => {
      setCharts({
        ...charts,
        [`question${questionId}`]: charts[`question${questionId}`]
          ? 0
          : questionId,
      });
    },
    [charts],
  );

  useEffect(() => {
    exec();
  }, []);

  console.log('chart page');
  return (
    <div>
      <h1>Question</h1>

      {resp ? (
        <div style={{ height: '400px', overflow: 'auto' }} className="m-4">
          <table className="table table-primary table-hover table-bordered">
            <thead>
              <tr>
                <th className="text-nowrap">Show Chart</th>
                <th>Question</th>
              </tr>
            </thead>
            <tbody>
              {resp.map(t => (
                <tr key={t.id}>
                  <td className="text-center">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id={`question${t.id}`}
                        checked={
                          !!charts[`question${t.id}`] &&
                          charts[`question${t.id}`] > 0
                        }
                        value={t.id}
                        name={`question${t.id}`}
                        onChange={e => {
                          console.log(t.id, e.target.checked);
                          showChart(t.id, e.target.checked);
                        }}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor={`question${t.id}`}
                      >
                        &nbsp;
                      </label>
                    </div>
                  </td>
                  <td>{t.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      <div className="chart m-auto w-75">
        {Object.keys(charts)
          .filter(t => charts[t] > 0)
          .map(t => (
            <QuestionChart
              key={charts[t]}
              surveyId={Number(id)}
              questionId={Number(charts[t])}
            />
          ))}
      </div>
    </div>
  );
};

SurveyChartPage.propTypes = {};

export default SurveyChartPage;
