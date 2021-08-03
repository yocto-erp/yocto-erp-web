import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import './file-upload.scss';
import { imageUrl } from '../../libs/apis/image.api';
import { isFunc } from '../../utils/util';

const PREVIEW_FILE = {
  doc: <i className="fa fa-file-word-o preview text-primary" />,
  xls: <i className="fa fa-file-excel-o preview text-success" />,
  ppt: <i className="fa fa-file-powerpoint-o preview text-danger" />,
  pdf: <i className="fa fa-file-pdf-o preview text-danger" />,
  zip: <i className="fa fa-file-archive-o preview text-muted" />,
  htm: <i className="fa fa-file-code-o preview text-info" />,
  txt: <i className="fa fa-file-text preview text-info" />,
  mov: <i className="fa fa-file-video-o preview text-warning" />,
  mp3: <i className="fa fa-file-audio-o preview text-warning" />,
  unknown: <i className="fa preview fa-file" />,
};

const MIME_TYPE = {
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
  VIDEO: 'video/*',
};

const PreviewImage = ({ file, onRemove, onViewLarge }) => {
  const els = useMemo(() => {
    let previewEls;
    const { type, source, fileId, data } = file;
    switch (type) {
      case MIME_TYPE.PDF:
        previewEls = PREVIEW_FILE.pdf;
        break;
      case MIME_TYPE.XLS:
      case MIME_TYPE.XLSX:
        previewEls = PREVIEW_FILE.xls;
        break;
      case MIME_TYPE.DOC:
      case MIME_TYPE.DOCX:
        previewEls = PREVIEW_FILE.doc;
        break;
      case MIME_TYPE.ZIP:
        previewEls = PREVIEW_FILE.zip;
        break;
      default:
        if (!type) {
          return (
            <img
              className="img-fluid img-thumbnail "
              src={imageUrl(fileId)}
              alt=""
            />
          );
        }
        if (type.match(MIME_TYPE.IMAGE)) {
          if (source === 'server') {
            previewEls = (
              <img
                className="img-fluid img-thumbnail "
                src={imageUrl(fileId)}
                alt=""
              />
            );
          } else {
            previewEls = (
              <img className="img-fluid img-thumbnail " src={data} alt="" />
            );
          }
        } else if (type.match(MIME_TYPE.AUDIO)) {
          previewEls = PREVIEW_FILE.mp3;
        } else if (type.match(MIME_TYPE.VIDEO)) {
          previewEls = PREVIEW_FILE.mov;
        } else {
          previewEls = PREVIEW_FILE.unknown;
        }
        break;
    }
    return previewEls;
  }, [file]);

  return (
    <div className="preview-image">
      <div className="btn-group btn-group-sm view">
        <button
          type="button"
          className="btn btn-primary"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            if (isFunc(onViewLarge)) {
              onViewLarge(e);
            }
          }}
        >
          <i className="fa fa-eye" />
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            if (isFunc(onRemove)) {
              onRemove();
            }
          }}
        >
          <i className="fa fa-times" />{' '}
        </button>
      </div>
      {els}
      <div className="title">{file.name}</div>
    </div>
  );
};

PreviewImage.propTypes = {
  file: PropTypes.object.isRequired,
  onRemove: PropTypes.func,
  onViewLarge: PropTypes.func,
};

export default PreviewImage;
