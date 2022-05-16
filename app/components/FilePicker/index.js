import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useDropzone } from "react-dropzone";

const FilePicker = ({ onPicked, className, ...props }) => {
  const onDropAccepted = React.useCallback(
    acceptedFiles => {
      console.log(acceptedFiles);
      onPicked(acceptedFiles);
    },
    [onPicked],
  );
  const onDropRejected = React.useCallback(rejectFiles => {
    console.log("Reject Files", rejectFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    onDropRejected,
    ...props,
  });
  return (
    <div
      className={classNames(
        "d-flex justify-content-center align-items-center h-100",
        className,
      )}
      style={{ minHeight: "400px" }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <div className="d-flex justify-content-center align-items-center">
        <h1 className="mr-2 text-white">
          Upload File &nbsp;-&nbsp;
          {isDragActive
            ? "Drop the files here ..."
            : "Drag & drop some files here, or click to select files"}
        </h1>
      </div>
    </div>
  );
};

FilePicker.propTypes = {
  onPicked: PropTypes.func,
  className: PropTypes.string,
  multiple: PropTypes.bool,
};

export default FilePicker;
