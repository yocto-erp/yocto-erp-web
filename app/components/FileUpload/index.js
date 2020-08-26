import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import PreviewImage from './PreviewImage';
import ModalOKButton from '../button/ModalOKButton';

const parseFile = file =>
  new Promise(resolve => {
    const reader = new FileReader();
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      const base64Data = reader.result;

      resolve({
        id: uuidv4(),
        name: file.name,
        type: file.type,
        ext: '',
        lastModified: file.lastModified,
        size: file.size,
        data: base64Data,
      });
    };
    reader.readAsDataURL(file);
  });

const FileUpload = ({ onChange, value = [], invalid, ...props }) => {
  const [files, setFiles] = useState(value);
  const [enlargeFile, setEnlargeFile] = useState(null);

  const onDropAccepted = React.useCallback(
    acceptedFiles => {
      console.log(acceptedFiles);
      Promise.all(acceptedFiles.map(file => parseFile(file))).then(t => {
        console.log(t);
        setFiles(oldFiles => {
          const newFiles = [...oldFiles, ...t];
          onChange(t);
          return newFiles;
        });
      });
    },
    [onChange],
  );
  const onDropRejected = React.useCallback(rejectFiles => {
    console.log(rejectFiles);
  });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    onDropRejected,
    ...props,
  });
  const onRemoveItem = index => {
    setFiles(oldFiles => {
      oldFiles.splice(index, 1);
      const newFiles = [...oldFiles];
      onChange(newFiles);
      return newFiles;
    });
  };

  const viewLarge = useCallback(
    (e, file) => {
      e.preventDefault();
      e.stopPropagation();
      setEnlargeFile(file);
    },
    [setEnlargeFile],
  );

  return (
    <div
      {...getRootProps()}
      className={classNames('upload-zone-wrapper', { 'is-invalid': invalid })}
    >
      <div className="upload-zone text-center">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag & drop some files here, or click to select files</p>
        )}
      </div>
      <div className="previews">
        <div className="row no-gutters">
          {files.map((t, i) => (
            <div
              role="button"
              tabIndex={i}
              onKeyDown={e => {
                viewLarge(e, t);
              }}
              className="col-lg-3 col-md-4 col-6"
              key={t.id}
              onClick={e => {
                viewLarge(e, t);
              }}
            >
              <PreviewImage
                image={t.data}
                name={t.name}
                onRemove={() => {
                  onRemoveItem(i);
                }}
                type={t.type}
              />
            </div>
          ))}
        </div>
      </div>
      <Modal
        scrollable
        size="xl"
        isOpen={enlargeFile != null && enlargeFile.type.match('image/*')}
        fade
      >
        <ModalHeader toggle={() => setEnlargeFile(null)}>
          {enlargeFile != null ? enlargeFile.name : ''}
        </ModalHeader>
        <ModalBody>
          <figure className="figure">
            {enlargeFile != null ? (
              <img
                src={enlargeFile.data}
                className="figure-img img-fluid rounded"
                alt=""
              />
            ) : (
              ''
            )}
            <figcaption className="figure-caption">
              {enlargeFile != null ? enlargeFile.name : ''}
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
};

FileUpload.propTypes = {
  invalid: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
  placeholder: PropTypes.any,
  name: PropTypes.string,
};

export default FileUpload;
