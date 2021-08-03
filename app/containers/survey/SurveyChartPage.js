import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useApi } from '../../libs/hooks/useApi';
import surveyApi from '../../libs/apis/survey/survey.api';
import QuestionChart from './components/QuestionChart';
import FormGroupInput from '../../components/Form/FormGroupInput';
import DateSelect from '../../components/date/DateSelect';
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
  const [openCharts, setOpenCharts] = useState({});

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

  const openChart = useCallback(
    questionId => {
      setOpenCharts({
        ...openCharts,
        [`question${questionId}`]: openCharts[`question${questionId}`]
          ? 0
          : questionId,
      });
    },
    [openCharts],
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
        .map((t, i) => (
          <QuestionChart
            index={i + 1}
            key={uuidv4()}
            surveyId={Number(id)}
            questionId={Number(charts[t])}
            filters={Object.keys(search).map(st => search[st])}
            isAllowFilter={filters.indexOf(i) > -1}
            fromDate={fromDate}
            toDate={toDate}
            onAllowFilter={() => allowFilter(i)}
            isOpen={!!openCharts[`question${Number(charts[t])}`]}
            setOpen={() => openChart(Number(charts[t]))}
          />
        )),
    [charts, search, fromDate, toDate, openCharts, filters],
  );

  useEffect(() => {
    exec();
  }, []);

  useEffect(() => {
    if (resp) {
      const newCharts = {};
      resp.forEach(t => {
        newCharts[`question${t.id}`] = t.id;
      });
      setCharts(newCharts);
    } else {
      setCharts({});
    }
  }, [resp]);

  return (
    <div>
      {resp ? (
        <>
          <div className="mb-5">
            <SurveyGlobalChart surveyId={id} />
          </div>
          <div className="text-center w-100">
            <div className="form-inline mt-4 justify-content-center">
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
          </div>
          <div className="row mt-4">
            {filters.map(t => {
              const item = resp[t];
              return (
                <div className="col-3" key={item.id}>
                  <FormGroupInput
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
                  </FormGroupInput>
                </div>
              );
            })}
          </div>
        </>
      ) : null}
      <div className="chart m-auto w-75">{chartEls}</div>
      {JSON.stringify(filters)}
    </div>
  );
};

SurveyChartPage.propTypes = {};

export default SurveyChartPage;
