import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import BarChartComponent from './components/BarChartComponent';
import PieChartComponent from './components/PieChartCompoment';

const SurveyChartPage = props => {
  console.log('chart page');
  return (
    <div>
      <h1>Question Summary</h1>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <BarChartComponent />
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <PieChartComponent />
        </Col>
      </Row>
    </div>
  );
};

SurveyChartPage.propTypes = {};

export default SurveyChartPage;
