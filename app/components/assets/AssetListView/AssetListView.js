import React from "react";
import PropTypes from "prop-types";
import { UncontrolledTooltip } from "reactstrap";
import AssetThumbnail from "./AssetThumbnail";
import "./AssetListView.scss";
import { cloudImageUrl } from "../../../libs/apis/image.api";
import { formatDate } from "../../../libs/utils/date.util";

const AssetListView = ({ list }) => (
  <div className="row no-gutters">
    {list.map(t => (
      <div className="col-auto" key={t.id}>
        <div className="asset-list-item" id={`item${t.id}`}>
          <a
            className="thumbnail d-block"
            href={cloudImageUrl(t)}
            target="_blank"
          >
            <AssetThumbnail asset={t} />
          </a>
        </div>
        <UncontrolledTooltip target={`item${t.id}`} className="tooltip-purple">
          <div className="text-left text-white">
            <strong>{t.name}</strong>
            <br />
            <span>
              <i className="fi flaticon-clock-1" />
              &nbsp;
              {formatDate(new Date(t.createdDate))}{" "}
            </span>
          </div>
        </UncontrolledTooltip>
      </div>
    ))}
  </div>
);

AssetListView.propTypes = {
  list: PropTypes.array.isRequired,
};

export default AssetListView;
