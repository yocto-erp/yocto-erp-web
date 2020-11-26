import React from 'react';
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const PieChartComponent = props => {
  const [data, setData] = React.useState([]);
  const options = {
    responsive: true,
  };

  React.useEffect(() => {
    setData({
      labels: ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'],
      datasets: [
        {
          data: [12, 19, 3, 5, 3],
          backgroundColor: [
            '#F7464A',
            '#46BFBD',
            '#FDB45C',
            '#949FB1',
            '#4D5360',
          ],
        },
        {
          data: [12, 19, 3, 5, 3],
          backgroundColor: [
            '#F7464A',
            '#46BFBD',
            '#FDB45C',
            '#949FB1',
            '#4D5360',
          ],
        },
        {
          data: [12, 19, 3, 5, 3],
          backgroundColor: [
            '#F7464A',
            '#46BFBD',
            '#FDB45C',
            '#949FB1',
            '#4D5360',
          ],
        },
      ],
    });
  }, [setData]);
  return (
    <div>
      <Pie data={data} options={options} />
    </div>
  );
};

PieChartComponent.propTypes = {};

export default PieChartComponent;
