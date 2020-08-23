import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';

const PageTitle = ({ title, subtitle, actions }) => (
  <Row className="align-items-center">
    <Col cols={6} className="d-flex justify-content-start">
      <h1 className="page-title">
        {title} &nbsp;
        <small>
          <small>{subtitle}</small>
        </small>
      </h1>
    </Col>
    {actions ? (
      <Col cols={6} className="text-right">
        {actions}
      </Col>
    ) : (
      ''
    )}
  </Row>
);

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  actions: PropTypes.node,
};

export default PageTitle;
