import React from "react";
import PropTypes from "prop-types";
import {
  FaFile,
  FaFileArchive,
  FaFileAudio,
  FaFileCsv,
  FaFileExcel,
  FaFilePdf,
  FaFilePowerpoint,
  FaFileVideo,
  FaFileWord,
} from "react-icons/all";
import { cloudAssetUrl } from "../../../libs/apis/image.api";
import {
  isAudioMimeType,
  isImageMimeType,
  isVideoMimeType,
  MIME_TYPE,
} from "../constants";
import { COLOR } from "../../../styles/color";
import AssetPdfView from "./AssetPdfView";
import AssetVideoView from "./AssetVideoView";

const AssetView = ({
  asset,
  color = COLOR.secondary,
  size = 16,
  display = "icon",
}) => {
  if (isImageMimeType(asset.mimeType)) {
    return (
      <img
        className="img-thumbnail"
        src={cloudAssetUrl(asset)}
        alt="thumbnail"
      />
    );
  }
  if (isVideoMimeType(asset.mimeType)) {
    return display === "icon" ? (
      <FaFileVideo color={color} size={size} />
    ) : (
      <AssetVideoView item={asset} />
    );
  }
  if (isAudioMimeType(asset.mimeType)) {
    return <FaFileAudio color={color} size={size} />;
  }
  switch (asset.mimeType) {
    case MIME_TYPE.DOCX:
      return <FaFileWord color={color} size={size} />;
    case MIME_TYPE.PDF:
      return display === "preview" ? (
        <AssetPdfView item={asset} />
      ) : (
        <FaFilePdf color={color} size={size} />
      );
    case MIME_TYPE.PPT:
    case MIME_TYPE.PPTX:
      return <FaFilePowerpoint color={color} size={size} />;
    case MIME_TYPE.XLS:
    case MIME_TYPE.XLSX:
      return <FaFileExcel color={color} size={size} />;
    case MIME_TYPE.CSV:
      return <FaFileCsv color={color} size={size} />;
    case MIME_TYPE.ZIP:
      return <FaFileArchive color={color} size={size} />;
    default:
      return <FaFile color={color} size={size} />;
  }
};

AssetView.propTypes = {
  asset: PropTypes.object,
  color: PropTypes.string,
  size: PropTypes.number,
  display: PropTypes.oneOf(["icon", "preview"]),
};

export default AssetView;
