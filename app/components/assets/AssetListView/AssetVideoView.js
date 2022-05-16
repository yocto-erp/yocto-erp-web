import React from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import { cloudAssetUrl } from "../../../libs/apis/image.api";
import "./AssetVideoView.scss";

const AssetVideoView = ({ item }) => (
  <div className="player-wrapper">
    <ReactPlayer
      light
      playing
      controls
      className="react-player"
      url={cloudAssetUrl(item)}
      width="100%"
      height="100%"
    />
  </div>
);

AssetVideoView.propTypes = {
  item: PropTypes.object.isRequired,
};

export default AssetVideoView;
