import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';

import classNames from 'classnames';
import s from './Dashboard.module.scss';
import PageTitle from '../Layout/PageTitle';
import GlobalChart from './components/GlobalChart';
import {
  thisMonthRange,
  thisWeekRange,
  todayRange,
} from '../../libs/utils/date.util';
import LabelBubbleChart from '../tagging/components/LabelBubbleChart';

function Dashboard() {
  const [dateRangeIndex, setDateRangeIndex] = useState(1);
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  useEffect(() => {
    let range = null;
    switch (dateRangeIndex) {
      case 1:
        range = thisWeekRange();
        break;
      case 2:
        range = thisMonthRange();
        break;
      default:
        range = todayRange();
        break;
    }
    setDateRange(range);
  }, [dateRangeIndex]);

  return (
    <div className={s.root}>
      <PageTitle
        title="Dashboard"
        actions={
          <div className="btn-group btn-group-toggle">
            <label
              className={classNames('btn btn-outline-primary', {
                active: dateRangeIndex === 0,
              })}
            >
              <input
                type="radio"
                name="options"
                id="option1"
                autoComplete="off"
                checked={dateRangeIndex === 0}
                onClick={() => setDateRangeIndex(0)}
              />{' '}
              Today
            </label>
            <label
              className={classNames('btn btn-outline-primary', {
                active: dateRangeIndex === 1,
              })}
            >
              <input
                type="radio"
                name="options"
                id="option2"
                autoComplete="off"
                checked={dateRangeIndex === 1}
                onClick={() => setDateRangeIndex(1)}
              />{' '}
              This Week
            </label>
            <label
              className={classNames('btn btn-outline-primary', {
                active: dateRangeIndex === 2,
              })}
            >
              <input
                type="radio"
                name="options"
                id="option3"
                autoComplete="off"
                checked={dateRangeIndex === 2}
                onClick={() => setDateRangeIndex(2)}
              />{' '}
              This Month
            </label>
          </div>
        }
      />

      <Row>
        <Col lg={4} xs={12}>
          <GlobalChart dateFrom={dateRange.from} dateTo={dateRange.to} />
        </Col>
        <Col lg={4} xs={12}>
          <LabelBubbleChart />
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
