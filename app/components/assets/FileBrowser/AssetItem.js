import React from "react";
import PropTypes from "prop-types";
import "./AssetItem.scss";
import classnames from "classnames";
import { UncontrolledTooltip } from "reactstrap";
import { ASSET_TYPE } from "../constants";
import MimeTypeIcon from "./MimeTypeIcon";
import noImage from "../../../images/No_image_available.svg";

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
        {type !== ASSET_TYPE.FOLDER ? (
          <div className="thumbnail">
            <img
              src={thumbnail || noImage}
              alt="thumbnail"
              referrerPolicy="no-referrer"
            />
          </div>
        ) : null}
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
    <UncontrolledTooltip target={`asset${id}`} placement="top">
      {name}
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
