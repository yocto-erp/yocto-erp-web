import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Input,
  Dropdown,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  Form,
  FormGroup,
} from 'reactstrap';
import Notifications from '../Notifications/Notifications';
import {
  openSidebar,
  closeSidebar,
  changeSidebarPosition,
  changeSidebarVisibility,
} from '../../containers/Layout/redux/navigation';

import s from './Header.module.scss';
import 'animate.css';
import AccountDropDown from './components/AccountDropdown';
import LanguageDropDown from './components/LanguageDropdown';

class Header extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isSidebarOpened: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
    this.toggleMessagesDropdown = this.toggleMessagesDropdown.bind(this);
    this.toggleSupportDropdown = this.toggleSupportDropdown.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleSearchOpen = this.toggleSearchOpen.bind(this);

    this.state = {
      messagesOpen: false,
      supportOpen: false,
      searchFocused: false,
      searchOpen: false,
    };
  }

  doLogout() {
    // this.props.dispatch(logoutUser());
  }

  toggleMessagesDropdown() {
    this.setState(previousState => ({
      messagesOpen: !previousState.messagesOpen,
    }));
  }

  toggleSupportDropdown() {
    this.setState(previousState => ({
      supportOpen: !previousState.supportOpen,
    }));
  }

  toggleSearchOpen() {
    this.setState(previousState => ({
      searchOpen: !previousState.searchOpen,
    }));
  }

  toggleSidebar() {
    this.props.isSidebarOpened
      ? this.props.dispatch(closeSidebar())
      : this.props.dispatch(openSidebar());
  }

  moveSidebar(position) {
    this.props.dispatch(changeSidebarPosition(position));
  }

  toggleVisibilitySidebar(visibility) {
    this.props.dispatch(changeSidebarVisibility(visibility));
  }

  render() {
    return (
      <Navbar className={`d-print-none ${s.root}`}>
        <Collapse
          className={`${s.searchCollapse} ml-lg-0 mr-md-3`}
          isOpen={this.state.searchOpen}
        >
          <InputGroup
            className={`${s.navbarForm} ${
              this.state.searchFocused ? s.navbarFormFocused : ''
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
              onFocus={() => this.setState({ searchFocused: true })}
              onBlur={() => this.setState({ searchFocused: false })}
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

        <Nav className="ml-md-0 d-flex nav-responsive">
          <NavItem className="d-lg-none d-md-block d-sm-none">
            <NavLink
              onClick={this.toggleSearchOpen}
              className={s.navItem}
              href="#"
            >
              <i className="glyphicon glyphicon-search text-white" />
            </NavLink>
          </NavItem>
          <AccountDropDown />
          <Dropdown
            nav
            isOpen={this.state.messagesOpen}
            toggle={this.toggleMessagesDropdown}
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
          <NavItem className={`${s.divider} text-white`} />
          <LanguageDropDown />
          <NavItem className="d-md-none">
            <NavLink
              onClick={this.toggleSidebar}
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
}

function mapStateToProps(store) {
  return {
    isSidebarOpened: store.navigation.sidebarOpened,
    sidebarVisibility: store.navigation.sidebarVisibility,
    sidebarPosition: store.navigation.sidebarPosition,
  };
}

export default withRouter(connect(mapStateToProps)(Header));
