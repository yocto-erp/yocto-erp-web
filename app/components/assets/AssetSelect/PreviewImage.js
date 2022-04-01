import React from "react";
import PropTypes from "prop-types";
import "./asset-select.scss";
import { isFunc } from "../../../utils/util";
import { getLocalFileThumbnail } from "../constants";

const PreviewImage = ({ file, onRemove, onViewLarge }) => (
  <div className="preview-image">
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
    <div className="title">{file.name}</div>
  </div>
);

PreviewImage.propTypes = {
  file: PropTypes.object.isRequired,
  onRemove: PropTypes.func,
  onViewLarge: PropTypes.func,
};

export default PreviewImage;
