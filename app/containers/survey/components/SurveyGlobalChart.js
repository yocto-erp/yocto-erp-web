import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { HorizontalBar, Bar } from 'react-chartjs-2';
import { useApi } from '../../../libs/hooks/useApi';
import surveyApi from '../../../libs/apis/survey/survey.api';
import { genderStr } from '../../../libs/apis/person.api';

const SurveyGlobalChart = ({ surveyId }) => {
  const {
    state: { resp: summary },
    exec: summaryExec,
  } = useApi(() => surveyApi.summary(surveyId));

  const globalChartData = useMemo(() => {
    const rs = {
      age: { labels: [], data: [] },
      location: { labels: [], data: [] },
      gender: { labels: [], data: [] },
    };
    if (summary) {
      const { age, location, gender } = summary;

      age.forEach(t => {
        rs.age.labels.push(t.ageRange);
        rs.age.data.push(t.total);
      });

      location.forEach(t => {
        rs.location.labels.push(t.address);
        rs.location.data.push(t.total);
      });

      gender.forEach(t => {
        rs.gender.labels.push(genderStr(t.sex));
        rs.gender.data.push(t.total);
      });
    }

    return rs;
  }, [summary]);

  const generateChartData = (title, labels, data) => ({
    labels,
    datasets: [
      {
        label: title,
        data,
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
  });

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

  useEffect(() => {
    summaryExec().then();
  }, []);
  return (
    <>
      <div className="row mb-4">
        <div className="col-md-4 offset-4">
          <div className="card text-white bg-primary">
            <div className="card-header">Total Vote #</div>
            <div className="card-body">
              <h5 className="card-title">{summary?.total || 0}</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <HorizontalBar
            data={generateChartData(
              '# Age Range Vote',
              globalChartData.age.labels,
              globalChartData.age.data,
            )}
            options={options}
          />
        </div>
        <div className="col-md-4">
          <HorizontalBar
            data={generateChartData(
              '# Location Vote',
              globalChartData.location.labels,
              globalChartData.location.data,
            )}
            options={options}
          />
        </div>
        <div className="col-md-4">
          <HorizontalBar
            data={generateChartData(
              '# Gender Vote',
              globalChartData.gender.labels,
              globalChartData.gender.data,
            )}
            options={options}
          />
        </div>
      </div>
    </>
  );
};

SurveyGlobalChart.propTypes = {
  surveyId: PropTypes.number.isRequired,
};

export default SurveyGlobalChart;
