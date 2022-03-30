import React, { useState } from "react";
import PropTypes from "prop-types";
import { Nav, NavItem, NavLink, TabContent } from "reactstrap";
import classNames from "classnames";
import GoogleDrive from "../google/GoogleDrive";
import LocalDrive from "../LocalDrive";

const tabs = ["My Drive", "Google Drive"];
// eslint-disable-next-line no-unused-vars
const FileBrowser = ({ onPicked, className, multiple = false }) => {
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
};

export default FileBrowser;
