import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import s from './Sidebar.module.scss';
import LinksGroup from './LinksGroup/LinksGroup';

import { changeActiveSidebarItem } from '../../containers/Layout/redux/navigation';
import { SIDE_BAR_MENU } from './constants';

class Sidebar extends React.Component {
  static propTypes = {
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    activeItem: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
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
            {SIDE_BAR_MENU.main.map(t => (
              <LinksGroup
                onActiveSidebarItemChange={activeItem =>
                  this.props.dispatch(changeActiveSidebarItem(activeItem))
                }
                key={t.index}
                activeItem={this.props.activeItem}
                header={t.header}
                isHeader={t.isHeader}
                iconName={t.iconName}
                link={t.link}
                index={t.index}
                childrenLinks={t.children}
              />
            ))}
          </ul>
          <h5 className={s.navTitle}>Tiện ích</h5>
          <ul>
            {SIDE_BAR_MENU.utils.map(t => (
              <LinksGroup
                key={t.index}
                onActiveSidebarItemChange={activeItem =>
                  this.props.dispatch(changeActiveSidebarItem(activeItem))
                }
                activeItem={this.props.activeItem}
                header={t.header}
                isHeader={t.isHeader}
                iconName={t.iconName}
                link={t.link}
                index={t.index}
              />
            ))}
          </ul>
          <h5 className={s.navTitle}>Hệ thống</h5>
          <ul>
            {SIDE_BAR_MENU.management.map(t => (
              <LinksGroup
                key={t.index}
                onActiveSidebarItemChange={activeItem =>
                  this.props.dispatch(changeActiveSidebarItem(activeItem))
                }
                activeItem={this.props.activeItem}
                header={t.header}
                isHeader={t.isHeader}
                iconName={t.iconName}
                link={t.link}
                index={t.index}
                childrenLinks={t.children}
              />
            ))}
          </ul>
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
