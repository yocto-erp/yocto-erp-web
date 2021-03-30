import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, ButtonToggle, Col, Row } from 'reactstrap';
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
          <ButtonGroup>
            <ButtonToggle
              color="primary"
              outline
              onClick={() => setDateRangeIndex(0)}
              active={dateRangeIndex === 0}
            >
              Today
            </ButtonToggle>
            <Button
              color="primary"
              outline
              onClick={() => setDateRangeIndex(1)}
              active={dateRangeIndex === 1}
            >
              This Week
            </Button>
            <Button
              color="primary"
              outline
              onClick={() => setDateRangeIndex(2)}
              active={dateRangeIndex === 2}
            >
              This Month
            </Button>
          </ButtonGroup>
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
