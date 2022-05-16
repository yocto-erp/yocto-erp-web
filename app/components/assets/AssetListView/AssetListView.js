import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { UncontrolledTooltip } from "reactstrap";
import AssetView from "./AssetView";
import "./AssetListView.scss";
import { formatDate } from "../../../libs/utils/date.util";
import AssetLargeViewModal from "./AssetLargeViewModal";

const AssetListView = ({ list, type = "thumbnail" }) => {
  const [viewIndex, setViewIndex] = useState(-1);

  if (!list) return null;
  return (
    <div className="row no-gutters">
      {list.map((t, i) => (
        <div className="col-auto" key={t.id}>
          <div className="asset-list-item" id={`item${t.id}`}>
            <button
              type="button"
              className={classNames("d-block btn btn-link asset", type)}
              onClick={() => setViewIndex(i)}
            >
              <AssetView asset={t} />
            </button>
          </div>
          <UncontrolledTooltip
            target={`item${t.id}`}
            className="tooltip-purple"
          >
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
      {viewIndex > -1 && (
        <AssetLargeViewModal
          assets={list}
          currentIndex={viewIndex}
          onClose={() => setViewIndex(-1)}
        />
      )}
    </div>
  );
};

AssetListView.propTypes = {
  list: PropTypes.array.isRequired,
  type: PropTypes.oneOf(["thumbnail", "normal"]),
};

export default AssetListView;
