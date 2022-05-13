import React from "react";
import PropTypes from "prop-types";
import { formatDate } from "../../../libs/utils/date.util";
import AssetListView from "../../../components/assets/AssetListView/AssetListView";
import RawHtml from "../../../components/RawHtml";

const CommentView = ({ item }) => {
  const { message, createdDate, assets, createdBy } = item;
  return (
    <div className="card mt-2 bg-primary">
      <div className="card-body p-2">
        <RawHtml html={message} />
        <AssetListView list={assets} />
      </div>
      <div className="card-footer p-2">
        <p className="card-text">
          <small className="text-muted">
            <i className="fi flaticon-user" />{" "}
            {createdBy.displayName || createdBy.email} -{" "}
            {formatDate(new Date(createdDate))}
          </small>
        </p>
      </div>
    </div>
  );
};

CommentView.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CommentView;
