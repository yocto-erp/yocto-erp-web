import React from "react";
import PropTypes from "prop-types";
import "./AssetItem.scss";
import classnames from "classnames";
import { UncontrolledTooltip } from "reactstrap";
import fileSize from "filesize";
import { ASSET_TYPE, getLocalFileThumbnail } from "../constants";
import MimeTypeIcon from "./MimeTypeIcon";
import { formatDate } from "../../../libs/utils/date.util";

const AssetItem = ({
  id,
  lastModifiedDate,
  mimeType,
  type,
  name,
  size,
  thumbnail,
  className,
  ...props
}) => (
  <>
    <div
      className={classnames("asset-item-wrapper", className)}
      {...props}
      id={`asset${id}`}
    >
      <div className="asset-item">
        {type !== ASSET_TYPE.FOLDER
          ? getLocalFileThumbnail({ mimeType, thumbnail })
          : null}
        <div className="title" title={name}>
          {type !== ASSET_TYPE.FOLDER ? (
            <MimeTypeIcon mimeType={mimeType} className="mr-2" />
          ) : (
            <i className="fa fa-folder fa-fw mr-2" />
          )}
          {name}
        </div>
      </div>
    </div>
    <UncontrolledTooltip
      target={`asset${id}`}
      placement="top"
      className="tooltip-purple"
    >
      <div className="text-left">
        <strong>{name}</strong>
        <br />
        <span className="text-nowrap">
          <i className="fi flaticon-time" />{" "}
          {formatDate(new Date(lastModifiedDate))}
        </span>
        <br />
        {type === ASSET_TYPE.FILE ? (
          <>
            <i className="fi flaticon-file" /> {fileSize(size)}
          </>
        ) : null}
      </div>
    </UncontrolledTooltip>
  </>
);

AssetItem.propTypes = {
  id: PropTypes.any.isRequired,
  name: PropTypes.string,
  lastModifiedDate: PropTypes.string,
  type: PropTypes.number,
  size: PropTypes.number,
  mimeType: PropTypes.string,
  thumbnail: PropTypes.string,
  className: PropTypes.string,
  onSelected: PropTypes.func,
};

export default AssetItem;
