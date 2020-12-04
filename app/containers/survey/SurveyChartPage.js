import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useApi } from '../../libs/hooks/useApi';
import surveyApi from '../../libs/apis/survey/survey.api';
import QuestionChart from './components/QuestionChart';
import FormGroup from '../../components/Form/FormGroup';
import DateSelect from '../../components/date/DateSelect';
import Widget from '../../components/Widget/Widget';
import SurveyGlobalChart from './components/SurveyGlobalChart';

const SurveyChartPage = props => {
  const { id } = useParams();
  const {
    state: { resp },
    exec,
  } = useApi(() => surveyApi.readSurveyQuestion(id));

  const [charts, setCharts] = useState({});
  const [filters, setFilters] = useState([]);
  const [search, setSearch] = useState({});
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const searchQuestion = useCallback(
    (questionId, answerKey) => {
      let currentQuest = search[`question${questionId}`];
      if (!currentQuest) {
        currentQuest = { questionId, key: answerKey };
      } else {
        currentQuest.key = answerKey;
      }

      setSearch({ ...search, [`question${questionId}`]: currentQuest });
    },
    [search],
  );

  const showChart = useCallback(
    questionId => {
      setCharts({
        ...charts,
        [`question${questionId}`]: charts[`question${questionId}`]
          ? 0
          : questionId,
      });
    },
    [charts],
  );

  const allowFilter = useCallback(questionIndex => {
    setFilters(prev => {
      const index = prev.indexOf(questionIndex);
      if (index > -1) {
        prev.splice(index, 1);
      } else {
        prev.push(questionIndex);
      }
      return [...prev];
    });
  }, []);

  const chartEls = useMemo(
    () =>
      Object.keys(charts)
        .filter(t => charts[t] > 0)
        .map(t => (
          <QuestionChart
            key={uuidv4()}
            surveyId={Number(id)}
            questionId={Number(charts[t])}
            filters={Object.keys(search).map(st => search[st])}
            fromDate={fromDate}
            toDate={toDate}
          />
        )),
    [charts, search, fromDate, toDate],
  );

  useEffect(() => {
    exec();
  }, []);

  return (
    <div>
      {resp ? (
        <>
          <div className="mb-5">
            <SurveyGlobalChart surveyId={id} />
          </div>
          <div style={{ maxHeight: '400px', overflow: 'auto' }}>
            <Widget className="widget-custom">
              <table className="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th className="text-nowrap">No</th>
                    <th className="text-nowrap">Show Chart</th>
                    <th className="text-nowrap">Allow Filter</th>
                    <th>Question</th>
                  </tr>
                </thead>
                <tbody>
                  {resp.map((t, index) => (
                    <tr key={t.id}>
                      <td>{index + 1}</td>
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
                      <td className="text-center">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={`filter${t.id}`}
                            checked={filters.indexOf(index) >= 0}
                            value={t.id}
                            name={`filter${t.id}`}
                            onChange={e => {
                              console.log(t.id, e.target.checked);
                              allowFilter(index);
                            }}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={`filter${t.id}`}
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
            </Widget>
          </div>
          <div className="form-inline mt-4">
            <label htmlFor="fromDate" className="mr-2">
              From Date
            </label>
            <DateSelect
              placeholder="Select From Date"
              id="fromDate"
              value={fromDate}
              onChange={setFromDate}
              isClearable
            />
            <label htmlFor="toDate" className="mr-2 ml-2">
              To Date
            </label>
            <DateSelect
              placeholder="Select To Date"
              id="toDate"
              value={toDate}
              minDate={fromDate}
              onChange={setToDate}
              isClearable
            />
          </div>
          <div className="row mt-4">
            {filters.map(t => {
              const item = resp[t];
              return (
                <div className="col-3" key={item.id}>
                  <FormGroup
                    name={`question${t}`}
                    type="select"
                    label={`Question ${t + 1}`}
                    onChange={e => {
                      console.log(e.target.value);
                      searchQuestion(item.id, e.target.value);
                    }}
                    value={search[`question${item.id}`]?.key || ''}
                  >
                    <option value="">ALL</option>
                    {item.questionAnswers.map(opt => (
                      <option key={opt.key} value={opt.key}>
                        {opt.content}
                      </option>
                    ))}
                  </FormGroup>
                </div>
              );
            })}
          </div>
        </>
      ) : null}
      <div className="chart m-auto w-75">{chartEls}</div>
    </div>
  );
};

SurveyChartPage.propTypes = {};

export default SurveyChartPage;
