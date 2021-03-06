import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Bar, HorizontalBar, Pie } from 'react-chartjs-2';
import { Card, CardBody, CardHeader, Collapse } from 'reactstrap';
import { useApi } from '../../../libs/hooks/useApi';
import surveyApi from '../../../libs/apis/survey/survey.api';

const QuestionChart = ({
  surveyId,
  questionId,
  type,
  fromDate,
  toDate,
  filters,
  index,
  onAllowFilter,
  isAllowFilter,
  isOpen,
  setOpen,
}) => {
  console.log(questionId, fromDate, toDate, isAllowFilter);
  const search = useMemo(() => {
    const rs = {};
    if (fromDate) {
      rs.fromDate = fromDate;
    }
    if (toDate) {
      rs.toDate = toDate;
    }
    if (filters) {
      rs.questions = Object.keys(filters).map(t => filters[t]);
    }
    return rs;
  }, [filters, fromDate, toDate]);

  const searchApi = useCallback(
    () => surveyApi.questionSummary(surveyId, questionId, search),
    [surveyId, questionId, search],
  );
  const {
    state: { resp },
    exec,
  } = useApi(searchApi);

  const [barType, setType] = React.useState('horizontalBar');

  useEffect(() => {
    exec();
  }, []);

  const data = {
    labels: resp ? resp.answers : [],
    datasets: [
      {
        label: '# of Votes',
        data: resp ? resp.totals : [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            precision: 0,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
            precision: 0,
          },
        },
      ],
    },
  };

  const chart = useMemo(() => {
    let rs = '';
    switch (barType) {
      case 'pie':
        rs = <Pie data={data} />;
        break;
      case 'bar':
        rs = <Bar data={data} options={options} />;
        break;
      default:
        rs = <HorizontalBar data={data} options={options} />;
        break;
    }
    return rs;
  }, [barType, data, options]);
  return (
    <Card className="text-left mt-5">
      <CardHeader className="font-weight-bolder">
        <div className="row align-items-center">
          <div className="col">
            {resp ? (
              <>
                Question {index} - {resp.content}
              </>
            ) : null}
          </div>
          <div className="col-md-auto form-inline">
            <div className="custom-control custom-checkbox mr-2">
              <input
                type="checkbox"
                className="custom-control-input"
                id={`allowFilter${questionId}`}
                checked={isAllowFilter}
                name={`allowFilter${questionId}`}
                onChange={() => {
                  onAllowFilter();
                }}
              />
              <label
                className="custom-control-label"
                htmlFor={`allowFilter${questionId}`}
              >
                Allow Filter
              </label>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setOpen(!isOpen)}
            >
              {isOpen ? 'Close Chart' : 'Show Chart'}
            </button>
          </div>
        </div>
      </CardHeader>
      <Collapse isOpen={isOpen}>
        <div className="row m-2">
          <div className="col-md-12 text-right">
            <div className="form-inline justify-content-end">
              <select
                className="form-control mr-2"
                value={barType}
                onChange={e => setType(e.target.value)}
              >
                <option value="bar">Bar</option>
                <option value="horizontalBar">Horizontal Bar</option>
                <option value="pie">Pie</option>
              </select>
            </div>
          </div>
        </div>
        <CardBody>{chart}</CardBody>
      </Collapse>
    </Card>
  );
};

QuestionChart.propTypes = {
  surveyId: PropTypes.number.isRequired,
  questionId: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['pie', 'bar', 'horizontalBar']),
  fromDate: PropTypes.instanceOf(Date),
  toDate: PropTypes.instanceOf(Date),
  filters: PropTypes.array,
  index: PropTypes.number,
  onAllowFilter: PropTypes.func,
  isAllowFilter: PropTypes.bool,
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default QuestionChart;
