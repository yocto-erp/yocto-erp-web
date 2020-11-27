import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Bar, HorizontalBar, Pie } from 'react-chartjs-2';
import { Card, CardBody, CardHeader, Collapse } from 'reactstrap';
import { useApi } from '../../../libs/hooks/useApi';
import surveyApi from '../../../libs/apis/survey/survey.api';

const QuestionChart = ({ surveyId, questionId, type }) => {
  const {
    state: { resp, isLoading, errors },
    exec,
  } = useApi(() => surveyApi.questionSummary(surveyId, questionId));
  const [state, setIsOpen] = React.useState(true);

  useEffect(() => {
    exec();
  }, []);

  useEffect(() => {
    console.log(resp);
  }, [resp]);

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
    switch (type) {
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
  }, [type, data, options]);
  return (
    <Card className="text-left mt-4">
      <CardHeader
        className="font-weight-bolder"
        onClick={() => setIsOpen(!state)}
      >
        <div className="row align-items-center">
          <div className="col">{resp ? resp.content : null}</div>
          <div className="col-md-auto">
            <button type="button" className="btn btn-primary">
              <i className="fa fa-cog" />{' '}
            </button>
          </div>
        </div>
      </CardHeader>
      <Collapse isOpen={state}>
        <CardBody>{chart}</CardBody>
      </Collapse>
    </Card>
  );
};

QuestionChart.propTypes = {
  surveyId: PropTypes.number.isRequired,
  questionId: PropTypes.number.isRequired,
  type: PropTypes.oneOfType(['pie', 'bar', 'horizontalBar']),
};

export default QuestionChart;
