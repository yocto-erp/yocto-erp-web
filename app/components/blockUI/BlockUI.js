import clsx from "clsx";
import React from "react";
import "./block-ui.scss";
import PropTypes from "prop-types";
import { Spinner } from "reactstrap";

const BlockUI = ({ className = "", children, isShow = false, content }) => (
  <div className="overlay-wrapper">
    <div className={clsx("overlay", className, { none: !isShow })}>
      {content || <Spinner />}
    </div>
    {children}
  </div>
);

BlockUI.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isShow: PropTypes.bool,
  content: PropTypes.node,
};

export default BlockUI;
