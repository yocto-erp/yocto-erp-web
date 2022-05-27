import React from "react";
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
import { ADMIN_PATH } from "../../constants";
import { thumbnail } from "../../libs/apis/image.api";
import Img from "../Img";

export const STORAGE_PROVIDER = {
  LOCAL: 1,
  GOOGLE: 2,
};

export const ROOT_FOLDER = "root";
export const SEARCH_FOLDER = "search";

export const ASSET_ROOT_PATH = `${ADMIN_PATH}/asset`;

export const ASSET_TYPE = {
  FILE: 1,
  FOLDER: 2,
};

export const MIME_TYPE = {
  PDF: "application/pdf",
  XLS: "application/vnd.ms-excel",
  XLSX: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  DOC: "application/msword",
  DOCX:
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  AUDIO: "audio/*",
  IMAGE: "image/*",
  TEXT: "text/*",
  ZIP: "application/zip",
  CSV: "text/csv",
  PPTX:
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  PPT: "application/vnd.ms-powerpoint",
  VIDEO: "video/*",
  FILE: "file",
  FOLDER: "folder",
};

export const ALL_MIME_TYPE = [
  MIME_TYPE.IMAGE,
  MIME_TYPE.VIDEO,
  MIME_TYPE.AUDIO,
  MIME_TYPE.PDF,
  MIME_TYPE.XLS,
  MIME_TYPE.CSV,
  MIME_TYPE.DOCX,
  MIME_TYPE.DOC,
  MIME_TYPE.XLS,
  MIME_TYPE.XLSX,
  MIME_TYPE.PPT,
  MIME_TYPE.PPTX,
  MIME_TYPE.ZIP,
];

export function isVideoMimeType(str) {
  const regex = new RegExp(/^video+\/[-\w.]+$/, "gm");
  return regex.test(str);
}

export function isAudioMimeType(str) {
  const regex = new RegExp(/^audio+\/[-\w.]+$/, "gm");
  return regex.test(str);
}

export function isImageMimeType(str) {
  const regex = new RegExp(/^image+\/[-\w.]+$/, "gm");
  return regex.test(str);
}

export const getLocalFileThumbnail = file => {
  if (isImageMimeType(file.mimeType)) {
    return (
      <div className="thumbnail">
        <Img
          src={file.thumbnail || thumbnail(file.fileId)}
          alt="thumbnail"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }
  let mimeTypeIcon;
  if (isVideoMimeType(file.mimeType)) {
    mimeTypeIcon = <FaFileVideo />;
  } else if (isAudioMimeType(file.mimeType)) {
    mimeTypeIcon = <FaFileAudio />;
  } else {
    switch (file.mimeType) {
      case MIME_TYPE.DOCX:
        mimeTypeIcon = <FaFileWord />;
        break;
      case MIME_TYPE.PDF:
        mimeTypeIcon = <FaFilePdf />;
        break;
      case MIME_TYPE.PPT:
      case MIME_TYPE.PPTX:
        mimeTypeIcon = <FaFilePowerpoint />;
        break;
      case MIME_TYPE.XLS:
      case MIME_TYPE.XLSX:
        mimeTypeIcon = <FaFileExcel />;
        break;
      case MIME_TYPE.CSV:
        mimeTypeIcon = <FaFileCsv />;
        break;
      case MIME_TYPE.ZIP:
        mimeTypeIcon = <FaFileArchive />;
        break;
      default:
        mimeTypeIcon = <FaFile />;
        break;
    }
  }

  return <div className="thumbnail">{mimeTypeIcon}</div>;
};

function matchRuleShort(rule) {
  const escapeRegex = objStr =>
    objStr.replace(/([.*+?^=!:${}()|[]\/\\])/g, "\\$1");
  return new RegExp(
    `^${rule
      .split("*")
      .map(escapeRegex)
      .join(".*")}$`,
    "gm",
  );
}

export function isValidMimeType(str, listMimeType) {
  let rs = false;
  if (!listMimeType || !listMimeType.length) {
    return true;
  }
  for (let i = 0; i < listMimeType.length; i += 1) {
    const regex = matchRuleShort(listMimeType[i]);
    rs = regex.test(str);
    if (rs) {
      break;
    }
  }

  return rs;
}
