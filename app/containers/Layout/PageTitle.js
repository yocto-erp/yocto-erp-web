import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "reactstrap";
import classNames from "classnames";

const PageTitle = ({
  title,
  subtitle,
  actions,
  colLeft = 6,
  colRight = 6,
  className,
}) => (
  <Row className={classNames("align-items-center mb-2 pb-3", className)}>
    <Col sm={colLeft} className="d-flex justify-content-start">
      <h1 className="page-title m-0">
        {title} &nbsp;
        <small>
          <small>{subtitle}</small>
        </small>
      </h1>
    </Col>
    {actions ? (
      <Col sm={colRight} className="text-md-right mt-2 mt-md-0">
        {actions}
      </Col>
    ) : (
      ""
    )}
  </Row>
);

PageTitle.propTypes = {
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.string,
  actions: PropTypes.node,
  colLeft: PropTypes.number,
  colRight: PropTypes.number,
  className: PropTypes.string,
};

export default PageTitle;
