import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavLink, TabContent } from 'reactstrap';
import classNames from 'classnames';
import GoogleDrive from '../google/GoogleDrive';

const tabs = ['My Drive', 'Google Drive'];
const FileBrowser = ({ onPicked, className, ...props }) => {
  const [tab, setTab] = useState(1);
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
      <TabContent>{tab === 1 ? <GoogleDrive /> : tab}</TabContent>
    </>
  );
};

FileBrowser.propTypes = {
  onPicked: PropTypes.func,
  className: PropTypes.string,
  multiple: PropTypes.bool,
};

export default FileBrowser;
