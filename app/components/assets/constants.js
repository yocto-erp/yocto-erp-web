import React from 'react';

export const FILE_ICON = {
  doc: <i className="fa fa-file-word-o text-primary" />,
  xls: <i className="fa fa-file-excel-o text-success" />,
  ppt: <i className="fa fa-file-powerpoint-o text-danger" />,
  pdf: <i className="fa fa-file-pdf-o text-danger" />,
  zip: <i className="fa fa-file-archive-o text-muted" />,
  htm: <i className="fa fa-file-code-o text-info" />,
  txt: <i className="fa fa-file-text text-info" />,
  mov: <i className="fa fa-file-video-o text-warning" />,
  mp3: <i className="fa fa-file-audio-o text-warning" />,
  img: <i className="fa fa-file-image-o text-warning" />,
  folder: <i className="fa fa-folder text-info" />,
  unknown: <i className="fa fa-file" />,
};

export const MIME_TYPE = {
  PDF: 'application/pdf',
  XLS: 'application/vnd.ms-excel',
  XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  DOC: 'application/msword',
  DOCX:
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  AUDIO: 'audio/*',
  IMAGE: 'image/*',
  TEXT: 'text/*',
  ZIP: 'application/zip',
  PPTX:
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  VIDEO: 'video/*',
  FILE: 'file',
  FOLDER: 'folder',
};

export function getMineTypeIcon(type) {
  switch (type) {
    case MIME_TYPE.PDF:
      return FILE_ICON.pdf;
    case MIME_TYPE.XLS:
    case MIME_TYPE.XLSX:
      return FILE_ICON.xls;
    case MIME_TYPE.DOC:
    case MIME_TYPE.DOCX:
      return FILE_ICON.doc;
    case MIME_TYPE.AUDIO:
      return FILE_ICON.mp3;
    case MIME_TYPE.IMAGE:
      return FILE_ICON.img;
    case MIME_TYPE.TEXT:
      return FILE_ICON.txt;
    case MIME_TYPE.ZIP:
      return FILE_ICON.zip;
    case MIME_TYPE.VIDEO:
      return FILE_ICON.mov;
    case MIME_TYPE.FOLDER:
      return FILE_ICON.folder;
    default:
      return FILE_ICON.unknown;
  }
}
