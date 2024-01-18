import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { imageUrl, thumbnail } from "../../../libs/apis/image.api";
import FilePickerModal from "../FileBrowser/FilePickerModal";
import { MIME_TYPE } from "../constants";
import "./asset-single-select.scss";
import ViewLargeAssetModal from "../ViewLargeAssetModal";

const AssetSingleSelect = React.forwardRef(
  // eslint-disable-next-line no-unused-vars
  (
    {
      onChange,
      value = null,
      invalid,
      className,
      fileTypes,
      isPreviewThumbnail = true,
      ...props
    },
    // eslint-disable-next-line no-unused-vars
    ref,
  ) => {
    const [isOpenPickerFile, setIsOpenPickerFile] = useState(false);
    const [enlargeFile, setEnlargeFile] = useState(null);
    return (
      <div
        className={classNames(
          "asset-single-wrapper",
          { "is-invalid": invalid },
          className,
        )}
      >
        <div className="button btn-group">
          {!value ? (
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => setIsOpenPickerFile(true)}
            >
              <i className="fi flaticon-file" /> {props.placeholder}
            </button>
          ) : (
            <>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => setEnlargeFile(value)}
              >
                <i className="fi flaticon-zoom-in" />
              </button>
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => onChange(null)}
              >
                <i className="fi flaticon-trash" />
              </button>
            </>
          )}
        </div>

        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div
          onClick={() => setEnlargeFile(value)}
          className="asset-single"
          style={{
            width: props.width || "300px",
            height: props.height || "300px",
          }}
        >
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <img
            src={
              isPreviewThumbnail
                ? thumbnail(value?.fileId)
                : imageUrl(value?.fileId)
            }
            alt="..."
            className="img-thumbnail"
          />
          <FilePickerModal
            closeHandle={listSelect => {
              console.log("onListSelect", listSelect);
              if (listSelect && listSelect.length) {
                onChange(listSelect[0]);
              }
              setIsOpenPickerFile(false);
            }}
            isOpen={isOpenPickerFile}
            fileTypes={[MIME_TYPE.IMAGE]}
            isMulti={false}
          />
          <ViewLargeAssetModal
            file={enlargeFile}
            onClose={() => setEnlargeFile(null)}
          />
        </div>
      </div>
    );
  },
);

AssetSingleSelect.propTypes = {
  invalid: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  placeholder: PropTypes.any,
  name: PropTypes.string,
  className: PropTypes.any,
  fileTypes: PropTypes.arrayOf(PropTypes.string),
  width: PropTypes.number,
  height: PropTypes.number,
  isPreviewThumbnail: PropTypes.bool,
};

export default AssetSingleSelect;
