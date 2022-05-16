import { connect } from "react-redux";
import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { BiMenu, BiMenuAltLeft } from "react-icons/all";
/* eslint-disable no-unused-vars */
import {
  Collapse,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Nav,
  Navbar,
  NavItem,
  NavLink,
} from "reactstrap";
import classNames from "classnames";
import {
  changeSidebarVisibility,
  closeSidebar,
  openSidebar,
} from "../redux/navigation";
import s from "./Header.module.scss";
import "../../../../node_modules/animate.css/animate.css";
import AccountDropDown from "./components/AccountDropdown";
import LanguageDropDown from "./components/LanguageDropdown";
import useUser from "../../../libs/hooks/useUser";
import { CONFIGURATION_COMPANY_ROOT_PATH } from "../../configuration/constants";

function Header({ dispatch, isSidebarOpened, sidebarVisibility }) {
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { user } = useUser();

  const toggleMessagesDropdown = useCallback(() => {
    setMessagesOpen(previousState => !previousState);
  }, []);

  const toggleSearchOpen = useCallback(() => {
    setSearchOpen(previousState => !previousState);
  }, []);

  const toggleSidebar = useCallback(() => {
    if (isSidebarOpened) {
      dispatch(closeSidebar());
    } else {
      dispatch(openSidebar());
    }
  }, [isSidebarOpened, dispatch]);

  const toggleVisibilitySidebar = useCallback(() => {
    dispatch(changeSidebarVisibility());
  }, []);

  return (
    <Navbar className={`d-print-none ${s.root}`}>
      <Nav
        className={classNames(
          "d-flex justify-content-center align-content-center nav-responsive d-md-down-none",
          s.rightMenu,
        )}
      >
        <NavItem className="">
          <NavLink
            onClick={toggleVisibilitySidebar}
            className={`${s.navItem} text-white`}
            href="#"
          >
            {sidebarVisibility === "show" ? (
              <BiMenuAltLeft size={32} />
            ) : (
              <BiMenu size={32} />
            )}
          </NavLink>
        </NavItem>
        <NavItem>
          <Link
            className={`${s.navItem} text-white nav-link company`}
            to={CONFIGURATION_COMPANY_ROOT_PATH}
          >
            {user?.company?.name}{" "}
            <i className="ml-2 fi flaticon-edit" style={{ fontSize: "1rem" }} />
          </Link>
        </NavItem>
      </Nav>

      {/*
      <Collapse
        className={`${s.searchCollapse} ml-lg-0 mr-md-3`}
        isOpen={searchOpen}
      >
        <InputGroup
          className={`${s.navbarForm} ${
            searchFocused ? s.navbarFormFocused : ""
          }`}
        >
          <InputGroupAddon addonType="prepend" className={s.inputAddon}>
            <InputGroupText>
              <i className="fa fa-search" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            id="search-input-2"
            placeholder="Search..."
            className="input-transparent"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </InputGroup>
      </Collapse>
      <Form className="d-md-down-none mr-3 ml-3" inline>
        <FormGroup>
          <InputGroup className="input-group-no-border">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="fa fa-search text-white" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              id="search-input"
              className="input-transparent"
              placeholder="Search"
            />
          </InputGroup>
        </FormGroup>
      </Form>
*/}
      <Nav className="ml-md-0 d-flex nav-responsive">
        <NavItem className="d-lg-none d-md-block d-sm-none">
          <NavLink onClick={toggleSearchOpen} className={s.navItem} href="#">
            <i className="glyphicon glyphicon-search text-white" />
          </NavLink>
        </NavItem>
        <AccountDropDown />
        {/*
        <Dropdown
          nav
          isOpen={messagesOpen}
          toggle={toggleMessagesDropdown}
          className={`${s.notificationsMenu}`}
        >
          <DropdownToggle nav className={`${s.navItem} text-white`}>
            <i className="glyphicon glyphicon-comments" />
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
        */}
        <NavItem className={`${s.divider} text-white`} />
        <LanguageDropDown />
        <NavItem className="d-md-none">
          <NavLink
            onClick={toggleSidebar}
            className={`${s.navItem} text-white`}
            href="#"
          >
            <i className="fa fa-bars" />
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isSidebarOpened: PropTypes.bool,
  sidebarVisibility: PropTypes.string,
};

function mapStateToProps(store) {
  return {
    isSidebarOpened: store.navigation.sidebarOpened,
    sidebarVisibility: store.navigation.sidebarVisibility,
    sidebarPosition: store.navigation.sidebarPosition,
  };
}

export default withRouter(connect(mapStateToProps)(Header));
