import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import s from './Sidebar.module.scss';
import LinksGroup from './LinksGroup/LinksGroup';

import { changeActiveSidebarItem } from '../Header/redux/navigation';

class Sidebar extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    activeItem: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    sidebarStatic: false,
    activeItem: '',
  };

  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
  }

  componentDidMount() {
    this.element.addEventListener(
      'transitionend',
      () => {
        if (this.props.sidebarOpened) {
          this.element.classList.add(s.sidebarOpen);
        }
      },
      false,
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sidebarOpened !== this.props.sidebarOpened) {
      if (nextProps.sidebarOpened) {
        this.element.style.height = `${this.element.scrollHeight}px`;
      } else {
        this.element.classList.remove(s.sidebarOpen);
        setTimeout(() => {
          this.element.style.height = '';
        }, 0);
      }
    }
  }

  doLogout() {}

  render() {
    return (
      <nav
        className={cx(s.root, s.staticSidebar)}
        ref={nav => {
          this.element = nav;
        }}
      >
        <div>
          <header className={s.logo}>
            <a href="/">
              Yocto <span className="fw-bold">ERP</span>
            </a>
          </header>

          <ul className={cx(s.nav)}>
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Dashboard"
              isHeader
              iconName="flaticon-home"
              link="/app/main"
              index="main"
            />
            <h5 className={[s.navTitle, s.groupTitle].join(' ')}>TEMPLATE</h5>
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Typography"
              isHeader
              iconName="flaticon-network"
              link="/app/typography"
              index="core"
            />
            <LinksGroup
              onActiveSidebarItemChange={t =>
                this.props.dispatch(changeActiveSidebarItem(t))
              }
              activeItem={this.props.activeItem}
              header="Tables Basic"
              isHeader
              iconName="flaticon-map-location"
              link="/app/tables"
              index="tables"
            />
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Notifications"
              isHeader
              iconName="flaticon-layers"
              link="/app/notifications"
              index="ui"
            />
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Components"
              isHeader
              iconName="flaticon-list"
              link="/app/forms"
              index="forms"
              childrenLinks={[
                {
                  header: 'Charts',
                  link: '/app/charts',
                },
                {
                  header: 'Icons',
                  link: '/app/icons',
                },
                {
                  header: 'Maps',
                  link: '/app/maps',
                },
              ]}
            />
          </ul>
          <h5 className={s.navTitle}>
            LABELS
            {/* eslint-disable-next-line */}
            <a className={s.actionLink}>
              <i
                className={`${
                  s.glyphiconSm
                } glyphicon glyphicon-plus float-right`}
              />
            </a>
          </h5>
          {/* eslint-disable */}
          <ul className={s.sidebarLabels}>
            <li>
              <a href="#">
                <i className="fa fa-circle text-success mr-2" />
                <span className={s.labelName}>My Recent</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-circle text-primary mr-2" />
                <span className={s.labelName}>Starred</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-circle text-danger mr-2" />
                <span className={s.labelName}>Background</span>
              </a>
            </li>
          </ul>
          {/* eslint-enable */}
          <h5 className={s.navTitle}>PROJECTS</h5>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    activeItem: store.navigation.activeItem,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
