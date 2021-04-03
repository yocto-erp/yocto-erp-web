import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
} from 'reactstrap';
import '../../../../node_modules/animate.css/animate.css';
import AccountDropDown from '../../Layout/Header/components/AccountDropdown';
import LanguageDropDown from '../../Layout/Header/components/LanguageDropdown';
import useUser from '../../../libs/hooks/useUser';
import s from '../../Layout/Header/Header.module.scss';
import Notifications from '../../../components/Notifications/Notifications';

function Header() {
  const { user } = useUser();
  const [messagesOpen, setMessagesOpen] = useState(false);
  const toggleMessagesDropdown = useCallback(() => {
    setMessagesOpen(previousState => !previousState);
  }, []);
  return (
    <div className="container-fluid">
      <Navbar className="d-print-none navbar-expand-lg ">
        <Link to="/" className="navbar-brand text-white mr-1">
          Yocto <span className="fw-bold">ERP</span>
        </Link>
        <div className="collapse navbar-collapse justify-content-end">
          <Nav className="nav navbar-nav navbar-right">
            {user ? (
              <AccountDropDown />
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/login">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/register">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
            <Dropdown
              nav
              isOpen={messagesOpen}
              toggle={toggleMessagesDropdown}
              className={`${s.notificationsMenu}`}
            >
              <DropdownToggle nav className={`${s.navItem} text-white`}>
                <i className="glyphicon glyphicon-shopping-cart" />
                <span className={`${s.count}`}>12</span>
              </DropdownToggle>
              <DropdownMenu
                className={`${
                  s.notificationsWrapper
                } py-0 animate__animated animate__faster animate__fadeInUp`}
              >
                <Notifications />
              </DropdownMenu>
            </Dropdown>
            <LanguageDropDown />
          </Nav>
        </div>
      </Navbar>
    </div>
  );
}

Header.propTypes = {};

export default Header;
