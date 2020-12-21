import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { HorizontalBar } from 'react-chartjs-2';
import { useApi } from '../../../libs/hooks/useApi';
import surveyApi from '../../../libs/apis/survey/survey.api';
import { genderStr } from '../../../libs/apis/person.api';
import { AGE_RANGES, useSurveyContext } from '../constants';

const SurveyGlobalChart = ({ surveyId }) => {
  const { survey } = useSurveyContext();
  const {
    state: { resp: summary },
    exec: summaryExec,
  } = useApi(() => surveyApi.summary(surveyId));

  const globalChartData = useMemo(() => {
    const rs = {
      age: { labels: AGE_RANGES, data: AGE_RANGES.map(() => 0) },
      location: { labels: [], data: [] },
      gender: { labels: [], data: [] },
    };
    if (summary) {
      const { age, location, gender } = summary;

      age.forEach(t => {
        const index = AGE_RANGES.findIndex(ageRange => t.ageRange === ageRange);
        if (index > -1) {
          rs.age.data[index] = t.total;
        }
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
        {survey?.formDetail.enableAge ? (
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
        ) : null}
        {survey?.formDetail.enableAddress ? (
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
        ) : null}
        {survey?.formDetail.enableGender ? (
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
        ) : null}
      </div>
    </>
  );
};

SurveyGlobalChart.propTypes = {
  surveyId: PropTypes.string.isRequired,
};

export default SurveyGlobalChart;
