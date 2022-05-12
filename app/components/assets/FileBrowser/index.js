import React, { useState } from "react";
import PropTypes from "prop-types";
import { Nav, NavItem, NavLink, TabContent } from "reactstrap";
import classNames from "classnames";
import GoogleDrive from "../google/GoogleDrive";
import LocalDrive from "../LocalDrive";
import { ALL_MIME_TYPE } from "../constants";

const tabs = ["My Drive", "Google Drive"];
// eslint-disable-next-line no-unused-vars
const FileBrowser = ({
  onPicked,
  className,
  multiple = true,
  fileTypes = ALL_MIME_TYPE,
}) => {
  const [tab, setTab] = useState(0);
  return (
    <>
      <Nav tabs>
        {tabs.map((t, i) => (
          <NavItem key={t}>
            <NavLink
              className={classNames({ active: tab === i })}
              onClick={() => {
                setTab(i);
              }}
            >
              {t}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent>
        {tab === 1 ? (
          <GoogleDrive
            multiple={multiple}
            className={className}
            onPicked={onPicked}
          />
        ) : (
          <LocalDrive
            multiple={multiple}
            className={className}
            onPicked={onPicked}
            fileTypes={fileTypes}
          />
        )}
      </TabContent>
    </>
  );
};

FileBrowser.propTypes = {
  onPicked: PropTypes.func,
  className: PropTypes.string,
  multiple: PropTypes.bool,
  fileTypes: PropTypes.array,
};

export default FileBrowser;
