import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import Hammer from 'rc-hammerjs';

import Scrollbar from 'smooth-scrollbar';

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import BreadcrumbHistory from '../BreadcrumbHistory/BreadcrumbHistory';
import { openSidebar, closeSidebar } from '../Header/redux/navigation';
import s from './Layout.module.scss';
import Dashboard from '../../containers/dashboard/Dashboard';

class Layout extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    sidebarStatic: false,
    sidebarOpened: false,
  };

  constructor(props) {
    super(props);

    this.handleSwipe = this.handleSwipe.bind(this);
    this.contentRef = React.createRef();
  }

  handleSwipe(e) {
    console.log(`Handle Swipe ${JSON.stringify(e.direction)}`);
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

  componentDidMount() {
    console.log(this.contentRef);
    Scrollbar.init(this.contentRef.current, {
      damping: 0.1,
      plugins: {
        overscroll: {
          effect: 'bounce',
          damping: 0.2,
          maxOverscroll: 150,
          glowColor: '#222a2d',
        },
      },
    });
  }

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
          <Hammer onSwipe={this.handleSwipe}>
            <main className={s.content} ref={this.contentRef}>
              <BreadcrumbHistory url={this.props.location.pathname} />
              <Switch>
                <Route
                  path="/"
                  exact
                  render={() => <Redirect to="/app/main/dashboard" />}
                />
                <Route path="/app/main/dashboard" exact component={Dashboard} />
              </Switch>
              <footer className={s.contentFooter}>
                Yocto ERP - Simple Management tool for small company.
              </footer>
            </main>
          </Hammer>
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
