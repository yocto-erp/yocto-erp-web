import React from "react";
import PropTypes from "prop-types";
import "./asset-select.scss";
import { UncontrolledTooltip } from "reactstrap";
import { isFunc } from "../../../utils/util";
import { getLocalFileThumbnail } from "../constants";
import { formatDate } from "../../../libs/utils/date.util";

const PreviewImage = ({ file, onRemove, onViewLarge }) => (
  <>
    <div className="preview-image" id={`item${file.id}`}>
      <div className="btn-group btn-group-sm view">
        <button
          type="button"
          className="btn btn-primary"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            if (isFunc(onViewLarge)) {
              onViewLarge(e);
            }
          }}
        >
          <i className="fa fa-eye" />
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            if (isFunc(onRemove)) {
              onRemove();
            }
          }}
        >
          <i className="fa fa-times" />{" "}
        </button>
      </div>
      {getLocalFileThumbnail(file)}
      <div className="title" title={file.name}>
        {file.name}
      </div>
    </div>
    <UncontrolledTooltip target={`item${file.id}`} className="tooltip-purple">
      <div className="text-left text-white">
        <strong>{file.name}</strong>
        <br />
        <span>
          <i className="fi flaticon-clock-1" />
          &nbsp;
          {formatDate(new Date(file.createdDate))}{" "}
        </span>
      </div>
    </UncontrolledTooltip>
  </>
);

PreviewImage.propTypes = {
  file: PropTypes.object.isRequired,
  onRemove: PropTypes.func,
  onViewLarge: PropTypes.func,
};

export default PreviewImage;
