import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import classNames from 'classnames';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import BreadcrumbHistory from '../../components/BreadcrumbHistory/BreadcrumbHistory';
import { openSidebar, closeSidebar } from './redux/navigation';
import s from './Layout.module.scss';
import Dashboard from '../dashboard/Dashboard';
import { WAREHOUSE_ROOT_PATH } from '../warehouse/constants';
import WarehousePage from '../warehouse/Loadable';

class Layout extends React.Component {
  static propTypes = {
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    sidebarPosition: PropTypes.any,
    sidebarVisibility: PropTypes.any,
    location: PropTypes.any,
  };

  static defaultProps = {
    sidebarOpened: false,
  };

  constructor(props) {
    super(props);

    this.handleSwipe = this.handleSwipe.bind(this);
  }

  handleSwipe(e) {
    if ('ontouchstart' in window) {
      if (e.direction === 4 && !this.state.chatOpen) {
        this.props.dispatch(openSidebar());
        return;
      }

      if (e.direction === 2 && this.props.sidebarOpened) {
        this.props.dispatch(closeSidebar());
        return;
      }

      this.setState({ chatOpen: e.direction === 2 });
    }
  }

  componentDidMount() {}

  render() {
    return (
      <div
        className={[
          s.root,
          `sidebar-${this.props.sidebarPosition}`,
          `sidebar-${this.props.sidebarVisibility}`,
        ].join(' ')}
      >
        <div className={s.wrap}>
          <Header />
          {/* <Chat chatOpen={this.state.chatOpen} /> */}
          {/* <Helper /> */}
          <Sidebar />
          <main>
            <OverlayScrollbarsComponent
              options={{
                resize: 'both',
                scrollbars: {
                  autoHide: 'scroll',
                },
                paddingAbsolute: false,
              }}
              className={classNames(s.content, 'os-theme-light')}
            >
              <BreadcrumbHistory url={this.props.location.pathname} />
              <Switch>
                <Route
                  path="/"
                  exact
                  render={() => <Redirect to="/app/main/dashboard" />}
                />
                <Route path="/app/main/dashboard" exact component={Dashboard} />
                <Route
                  path={`${WAREHOUSE_ROOT_PATH}`}
                  component={WarehousePage}
                />
              </Switch>
              <footer className={s.contentFooter}>
                Yocto ERP - Simple Management tool for small company.
              </footer>
            </OverlayScrollbarsComponent>
          </main>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarPosition: store.navigation.sidebarPosition,
    sidebarVisibility: store.navigation.sidebarVisibility,
  };
}

export default withRouter(connect(mapStateToProps)(Layout));
