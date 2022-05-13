import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { ReactSortable } from "react-sortablejs";
import PreviewImage from "./PreviewImage";
import FilePickerModal from "../FileBrowser/FilePickerModal";
import ViewLargeAssetModal from "../ViewLargeAssetModal";
import { ALL_MIME_TYPE } from "../constants";

const AssetSelect = React.forwardRef(
  // eslint-disable-next-line no-unused-vars
  (
    {
      onChange,
      value = [],
      invalid,
      className,
      fileTypes = ALL_MIME_TYPE,
      buttonStyle = "btn-outline-primary",
      buttonWrapperStyle = "justify-content-center",
      ...props
    },
    // eslint-disable-next-line no-unused-vars
    ref,
  ) => {
    // const [files, setFiles] = useState([]);
    const [isOpenPickerFile, setIsOpenPickerFile] = useState(false);
    const [enlargeFile, setEnlargeFile] = useState(null);

    const onRemoveItem = index => {
      const newItems = [...value];
      newItems.splice(index, 1);
      onChange(newItems);
      return newItems;
    };

    const viewLarge = useCallback(
      (e, file) => {
        e.preventDefault();
        e.stopPropagation();
        setEnlargeFile(file);
      },
      [setEnlargeFile],
    );

    const preview = React.useMemo(
      () => (
        <div className="previews">
          <ReactSortable
            className="row no-gutters"
            list={value || []}
            setList={onChange}
          >
            {(value || [])
              .filter(t => t !== null)
              .map((t, i) => (
                <div
                  tabIndex={i}
                  className="col-lg-3 col-md-4 col-6"
                  key={t.id}
                >
                  <PreviewImage
                    style={{ cursor: "move" }}
                    file={t}
                    onRemove={() => {
                      onRemoveItem(i);
                    }}
                    onViewLarge={e => viewLarge(e, t)}
                  />
                </div>
              ))}
          </ReactSortable>
        </div>
      ),
      [value],
    );

    return (
      <div
        className={classNames(
          "upload-zone-wrapper",
          { "is-invalid": invalid },
          className,
        )}
      >
        <div className="upload-zone text-center">
          <div className={classNames("d-flex", buttonWrapperStyle)}>
            <button
              type="button"
              className={classNames("mr-2 text-white btn", buttonStyle)}
              onClick={() => setIsOpenPickerFile(true)}
            >
              {props.placeholder}
            </button>
          </div>
        </div>
        {preview}
        <FilePickerModal
          closeHandle={listSelect => {
            if (listSelect && listSelect.length) {
              const newList = [...value];
              for (let i = 0; i < listSelect.length; i += 1) {
                if (!value.find(t => t.id === listSelect[i].id)) {
                  newList.push(listSelect[i]);
                }
              }
              onChange(newList);
            }
            setIsOpenPickerFile(false);
          }}
          isOpen={isOpenPickerFile}
          fileTypes={fileTypes}
          isMulti
        />
        <ViewLargeAssetModal
          file={enlargeFile}
          onClose={() => setEnlargeFile(null)}
        />
      </div>
    );
  },
);

AssetSelect.propTypes = {
  invalid: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
  placeholder: PropTypes.any,
  name: PropTypes.string,
  className: PropTypes.any,
  buttonStyle: PropTypes.string,
  buttonWrapperStyle: PropTypes.string,
  fileTypes: PropTypes.arrayOf(PropTypes.string),
};

export default AssetSelect;
