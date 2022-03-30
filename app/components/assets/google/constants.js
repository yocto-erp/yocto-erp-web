import { MIME_TYPE } from "../constants";

export const GOOGLE_MIME_TYPE = {
  AUDIO: "application/vnd.google-apps.audio",
  DOCX: "application/vnd.google-apps.document",
  IMAGE: "application/vnd.google-apps.drawing",
  FILE: "application/vnd.google-apps.file",
  FOLDER: "application/vnd.google-apps.folder",
  FORM: "application/vnd.google-apps.form",
  MAP: "application/vnd.google-apps.map",
  PHOTO: "application/vnd.google-apps.photo",
  PPT: "application/vnd.google-apps.presentation",
  SCRIPT: "application/vnd.google-apps.script",
  WEB: "application/vnd.google-apps.site",
  XLSX: "application/vnd.google-apps.spreadsheet",
  UNKNOWN: "application/vnd.google-apps.unknown",
  VIDEO: "application/vnd.google-apps.video",
};

export function googleMappingType(type) {
  switch (type) {
    case GOOGLE_MIME_TYPE.AUDIO:
      return MIME_TYPE.AUDIO;
    case GOOGLE_MIME_TYPE.DOCX:
      return MIME_TYPE.DOCX;
    case GOOGLE_MIME_TYPE.IMAGE:
    case GOOGLE_MIME_TYPE.PHOTO:
      return MIME_TYPE.IMAGE;
    case GOOGLE_MIME_TYPE.FOLDER:
      return MIME_TYPE.FOLDER;
    case GOOGLE_MIME_TYPE.PPT:
      return MIME_TYPE.PPT;
    case GOOGLE_MIME_TYPE.XLSX:
      return MIME_TYPE.XLSX;
    case GOOGLE_MIME_TYPE.VIDEO:
      return MIME_TYPE.VIDEO;
    default:
      return type;
  }
}
