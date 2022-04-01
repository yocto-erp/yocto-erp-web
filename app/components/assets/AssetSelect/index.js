import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { ReactSortable } from "react-sortablejs";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PreviewImage from "./PreviewImage";
import ModalOKButton from "../../button/ModalOKButton";
import { imageUrl } from "../../../libs/apis/image.api";
import FilePickerModal from "../FileBrowser/FilePickerModal";

const AssetSelect = React.forwardRef(
  // eslint-disable-next-line no-unused-vars
  ({ onChange, value = [], invalid, className, fileTypes, ...props }, ref) => {
    // const [files, setFiles] = useState([]);
    const [isOpenPickerFile, setIsOpenPickerFile] = useState(false);
    const [enlargeFile, setEnlargeFile] = useState(null);

    const onRemoveItem = index => {
      value.splice(index, 1);
      const newFiles = [...value];
      onChange(newFiles);
      return newFiles;
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
            list={value}
            setList={onChange}
          >
            {value.map((t, i) => (
              <div tabIndex={i} className="col-lg-3 col-md-4 col-6" key={t.id}>
                <PreviewImage
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
          <div className="d-flex justify-content-center align-items-center">
            <button
              type="button"
              className="mr-2 text-white btn btn-outline-primary"
              onClick={() => setIsOpenPickerFile(true)}
            >
              {props.placeholder}
            </button>
          </div>
        </div>
        {preview}
        <FilePickerModal
          closeHandle={listSelect => {
            console.log("onListSelect", listSelect);
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
        <Modal scrollable size="xl" isOpen={enlargeFile != null} fade={false}>
          <ModalHeader toggle={() => setEnlargeFile(null)}>
            {enlargeFile != null ? enlargeFile.name : ""}
          </ModalHeader>
          <ModalBody className="text-center">
            <figure className="figure">
              {enlargeFile != null ? (
                <img
                  src={imageUrl(enlargeFile?.fileId)}
                  className="figure-img img-fluid rounded"
                  alt=""
                />
              ) : (
                ""
              )}
              <figcaption className="figure-caption">
                {enlargeFile != null ? enlargeFile.name : ""}
              </figcaption>
            </figure>
          </ModalBody>
          <ModalFooter>
            <ModalOKButton type="button" onClick={() => setEnlargeFile(null)}>
              Close
            </ModalOKButton>
          </ModalFooter>
        </Modal>
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
  fileTypes: PropTypes.arrayOf(PropTypes.string),
};

export default AssetSelect;
