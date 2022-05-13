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
import { cloudImageUrl } from "../../../libs/apis/image.api";
import {
  isAudioMimeType,
  isImageMimeType,
  isVideoMimeType,
  MIME_TYPE,
} from "../constants";
import { COLOR } from "../../../styles/color";

const AssetThumbnail = ({ asset, color = COLOR.secondary }) => {
  if (isImageMimeType(asset.mimeType)) {
    return (
      <img
        className="img-thumbnail"
        src={cloudImageUrl(asset)}
        alt="thumbnail"
      />
    );
  }
  if (isVideoMimeType(asset.mimeType)) {
    return <FaFileVideo color={color} />;
  }
  if (isAudioMimeType(asset.mimeType)) {
    return <FaFileAudio color={color} />;
  }
  switch (asset.mimeType) {
    case MIME_TYPE.DOCX:
      return <FaFileWord color={color} />;
    case MIME_TYPE.PDF:
      return <FaFilePdf color={color} />;
    case MIME_TYPE.PPT:
    case MIME_TYPE.PPTX:
      return <FaFilePowerpoint color={color} />;
    case MIME_TYPE.XLS:
    case MIME_TYPE.XLSX:
      return <FaFileExcel color={color} />;
    case MIME_TYPE.CSV:
      return <FaFileCsv color={color} />;
    case MIME_TYPE.ZIP:
      return <FaFileArchive color={color} />;
    default:
      return <FaFile color={color} />;
  }
};

AssetThumbnail.propTypes = {
  asset: PropTypes.object,
  color: PropTypes.string,
};

export default AssetThumbnail;
