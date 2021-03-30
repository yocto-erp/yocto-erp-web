import React, { useEffect } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import s from './Sidebar.module.scss';
import LinksGroup from './LinksGroup/LinksGroup';

import { changeActiveSidebarItem } from '../redux/navigation';
import { SIDE_BAR_MENU } from './constants';
import useUser from '../../../libs/hooks/useUser';

function Sidebar({ dispatch, sidebarOpened }) {
  const element = React.useRef();
  const { isHasAnyPermission } = useUser();

  const processLinkGroup = t => (
    <LinksGroup
      onActiveSidebarItemChange={_activeItem =>
        dispatch(changeActiveSidebarItem(_activeItem))
      }
      isHasPermission={isHasAnyPermission}
      key={t.index}
      header={t.header}
      isHeader={t.isHeader}
      iconName={t.iconName}
      exact={t.exact}
      link={t.link}
      index={t.index}
      childrenLinks={t.children}
    />
  );

  useEffect(() => {
    if (element.current) {
      element.current.addEventListener(
        'transitionend',
        () => {
          if (sidebarOpened) {
            element.current.classList.add(s.sidebarOpen);
          }
        },
        false,
      );
    }
  }, []);

  useEffect(() => {
    if (element.current) {
      if (sidebarOpened) {
        element.current.style.height = `${element.current.scrollHeight}px`;
      } else {
        element.current.classList.remove(s.sidebarOpen);
        setTimeout(() => {
          element.current.style.height = '';
        }, 0);
      }
    }
  }, [sidebarOpened]);

  return (
    <nav className={cx(s.root, s.staticSidebar)} ref={element}>
      <div>
        <header className={s.logo}>
          <Link to="/">
            Yocto <span className="fw-bold">ERP</span>
          </Link>
        </header>

        <ul className={cx(s.nav)}>
          {SIDE_BAR_MENU.main
            .filter(
              t =>
                !t.permission ||
                isHasAnyPermission({ permission: t.permission }),
            )
            .map(processLinkGroup)}
        </ul>
        <h5 className={s.navTitle}>Tiện ích</h5>
        <ul>
          {SIDE_BAR_MENU.utils
            .filter(
              t =>
                !t.permission ||
                isHasAnyPermission({ permission: t.permission }),
            )
            .map(processLinkGroup)}
        </ul>
        <h5 className={s.navTitle}>Hệ thống</h5>
        <ul>
          {SIDE_BAR_MENU.management
            .filter(
              t =>
                !t.permission ||
                isHasAnyPermission({ permission: t.permission }),
            )
            .map(processLinkGroup)}
        </ul>
      </div>
    </nav>
  );
}

Sidebar.propTypes = {
  sidebarOpened: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  activeItem: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    activeItem: store.navigation.activeItem,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
