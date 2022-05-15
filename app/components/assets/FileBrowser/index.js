import React from "react";
import PropTypes from "prop-types";
import LocalDrive from "../LocalDrive";
import { ALL_MIME_TYPE } from "../constants";

// const tabs = ["My Drive", "Google Drive"];
// eslint-disable-next-line no-unused-vars
const FileBrowser = ({
  onPicked,
  className,
  multiple = true,
  fileTypes = ALL_MIME_TYPE,
}) => (
  // const [tab, setTab] = useState(0);
  <LocalDrive
    multiple={multiple}
    className={className}
    onPicked={onPicked}
    fileTypes={fileTypes}
  />
);
FileBrowser.propTypes = {
  onPicked: PropTypes.func,
  className: PropTypes.string,
  multiple: PropTypes.bool,
  fileTypes: PropTypes.array,
};

export default FileBrowser;
