import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
} from "reactstrap";
import "../../../../node_modules/animate.css/animate.css";
import { PropTypes } from "prop-types";
import AccountDropDown from "../../Layout/Header/components/AccountDropdown";
import LanguageDropDown from "../../Layout/Header/components/LanguageDropdown";
import useUser from "../../../libs/hooks/useUser";
import s from "../../Layout/Header/Header.module.scss";
import CartNotification from "./CartNotification/CartNotification";

function Header({ companyName }) {
  const { user } = useUser();
  const [messagesOpen, setMessagesOpen] = useState(false);
  const toggleMessagesDropdown = useCallback(() => {
    setMessagesOpen(previousState => !previousState);
  }, []);
  const { products } = useSelector(state => state.shop);
  return (
    <div className="container-fluid">
      <Navbar className="d-print-none navbar-expand-lg ">
        <Link to="/" className="navbar-brand text-white mr-1">
          Yocto <span className="fw-bold">ERP</span>
        </Link>
        <h4 className="navbar-brand text-white mr-1 mt-2 ml-5">
          {companyName || ""}
        </h4>
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
                <span className={`${s.count}`}>{products?.length}</span>
              </DropdownToggle>
              <DropdownMenu
                className={`${
                  s.notificationsWrapper
                } py-0 animate__animated animate__faster animate__fadeInUp`}
              >
                <CartNotification />
              </DropdownMenu>
            </Dropdown>
            <LanguageDropDown />
          </Nav>
        </div>
      </Navbar>
    </div>
  );
}

Header.propTypes = {
  companyName: PropTypes.any,
};

export default Header;
