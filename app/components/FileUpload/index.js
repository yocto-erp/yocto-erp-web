import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from 'reactstrap';
import { toast } from 'react-toastify';
import PreviewImage from './PreviewImage';
import ModalOKButton from '../button/ModalOKButton';
import { imageUrl } from '../../libs/apis/image.api';

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
        lastModified: file.lastModified,
        size: file.size,
        data: base64Data,
      });
    };
    reader.readAsDataURL(file);
  });

const getFileUrl = file => {
  const { source, data, fileId } = file;
  if (source === 'server') {
    return imageUrl(fileId);
  }
  return data;
};

const getErrorUpload = errorFile => {
  const { errors, file } = errorFile;
  return (
    <span>
      File <strong>{file.name}</strong>: {errors[0].message}
    </span>
  );
};

const FileUpload = React.forwardRef(
  // eslint-disable-next-line no-unused-vars
  ({ onChange, value = [], invalid, className, ...props }, ref) => {
    const [files, setFiles] = useState([]);
    const [enlargeFile, setEnlargeFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
      setFiles([...value]);
    }, [value]);

    const onDropAccepted = React.useCallback(
      acceptedFiles => {
        setIsProcessing(true);
        Promise.all(acceptedFiles.map(file => parseFile(file))).then(t => {
          setFiles(oldFiles => {
            const newFiles = [...oldFiles, ...t];
            onChange(newFiles);
            return newFiles;
          });
          setIsProcessing(false);
        });
      },
      [onChange, setIsProcessing, setFiles],
    );
    const onDropRejected = React.useCallback(rejectFiles => {
      const errors = (
        <ul className="m-0 p-2">
          {rejectFiles
            .map(t => getErrorUpload(t))
            .map(e => (
              <li key={uuidv4()}>{e}</li>
            ))}
        </ul>
      );
      toast.error(errors);
    }, []);

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

    const preview = React.useMemo(
      () => (
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
                  file={t}
                  onRemove={() => {
                    onRemoveItem(i);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ),
      [files],
    );

    return (
      <div
        {...getRootProps()}
        className={classNames(
          'upload-zone-wrapper',
          { 'is-invalid': invalid },
          className,
        )}
      >
        <div className="upload-zone text-center">
          <input {...getInputProps()} />
          <div className="d-flex justify-content-center align-items-center">
            <p className="mr-2 text-white">
              {props.placeholder}&nbsp;-&nbsp;
              {isDragActive
                ? 'Drop the files here ...'
                : 'Drag & drop some files here, or click to select files'}
            </p>
            {isProcessing ? <Spinner color="info" /> : ''}
          </div>
        </div>
        {preview}
        <Modal scrollable size="xl" isOpen={enlargeFile != null} fade={false}>
          <ModalHeader toggle={() => setEnlargeFile(null)}>
            {enlargeFile != null ? enlargeFile.name : ''}
          </ModalHeader>
          <ModalBody>
            <figure className="figure">
              {enlargeFile != null ? (
                <img
                  src={getFileUrl(enlargeFile)}
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
  },
);

FileUpload.propTypes = {
  invalid: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
  placeholder: PropTypes.any,
  name: PropTypes.string,
  className: PropTypes.any,
};

export default FileUpload;
