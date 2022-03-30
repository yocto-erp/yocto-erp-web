import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { MIME_TYPE } from "../constants";

const MimeTypeIcon = ({ mimeType, className, ...props }) => {
  let rs = "fa fa-file fa-fw";
  switch (mimeType) {
    case MIME_TYPE.PDF:
      rs = "fa fa-file-pdf-o fa-fw";
      break;
    case MIME_TYPE.XLS:
    case MIME_TYPE.XLSX:
      rs = "fa fa-file-excel-o fa-fw";
      break;
    case MIME_TYPE.DOC:
    case MIME_TYPE.DOCX:
      rs = "fa fa-file-word-o fa-fw";
      break;
    case MIME_TYPE.AUDIO:
      rs = "fa fa-file-audio-o fa-fw";
      break;
    case MIME_TYPE.IMAGE:
      rs = "fa fa-file-image-o fa-fw";
      break;
    case MIME_TYPE.TEXT:
      rs = "fa fa-file-text fa-fw";
      break;
    case MIME_TYPE.ZIP:
      rs = "fa fa-file-archive-o fa-fw";
      break;
    case MIME_TYPE.VIDEO:
      rs = "fa fa-file-video-o fa-fw";
      break;
    case MIME_TYPE.FOLDER:
      rs = "fa fa-folder fa-fw";
      break;
    case MIME_TYPE.PPTX:
      rs = "fa fa-file-powerpoint-o fa-fw";
      break;
    default:
      rs = "fa fa-file fa-fw";
      break;
  }
  return <i className={classNames(rs, className)} {...props} />;
};

MimeTypeIcon.propTypes = {
  mimeType: PropTypes.string,
  className: PropTypes.string,
};

export default MimeTypeIcon;
