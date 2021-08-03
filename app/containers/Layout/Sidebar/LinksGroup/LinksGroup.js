import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Badge, Button, Collapse } from 'reactstrap';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import s from './LinksGroup.module.scss';
import {
  changeActiveSidebarItem,
  changeActiveSidebarMenu,
  selectActiveItem,
  selectActiveMenu,
} from '../../redux/navigation';

const LinksGroup = ({
  header,
  link,
  childrenLinks,
  iconName,
  className,
  badge,
  label,
  index,
  deep,
  labelColor,
  exact,
  isHeader,
  isHasPermission,
}) => {
  const dispatch = useDispatch();
  const activeItem = useSelector(selectActiveItem);
  const activeMenu = useSelector(selectActiveMenu);

  const onLinkClick = item => {
    dispatch(changeActiveSidebarItem(item));
  };

  const togglePanelCollapse = (item, e) => {
    dispatch(changeActiveSidebarMenu(item));
    e.preventDefault();
  };
  const isOpen = !!activeMenu && activeMenu.includes(index);
  const headingStyle = isHeader
    ? {}
    : { paddingLeft: `${36 + 10 * (deep - 1)}px` };

  const menuItem = (
    <li className={[s.headerLink, className].join(' ')}>
      <NavLink
        to={link}
        activeClassName={s.headerLinkActive}
        exact={exact}
        onClick={e => onLinkClick(index, e)}
        style={headingStyle}
      >
        <span className={s.icon}>
          <i className={`${iconName}`} />
        </span>
        {header}{' '}
        {label && (
          <sup className={`${s.headerLabel} text-${labelColor || 'warning'}`}>
            {label}
          </sup>
        )}
        {badge && (
          <Badge className={s.badge} color="primary" pill>
            9
          </Badge>
        )}
      </NavLink>
    </li>
  );

  return (
    <>
      {!childrenLinks ? (
        menuItem
      ) : (
        <li
          key={index}
          className={classnames({ [s.headerLink]: isHeader }, className)}
        >
          <Button
            color="link"
            type="button"
            className={classnames(
              s.accordionToggle,
              {
                [s.headerLinkActive]: activeItem.includes(index),
              },
              { [s.collapsed]: isOpen },
              'd-flex link',
            )}
            style={{
              paddingLeft: `${deep === 0 ? 20 : 35 + 10 * (deep - 1)}px`,
            }}
            onClick={e => togglePanelCollapse(index, e)}
            href="#"
          >
            {isHeader ? (
              <span className={s.icon}>
                <i className={iconName} />
              </span>
            ) : null}
            {header}{' '}
            {label && (
              <sup
                className={`${s.headerLabel} text-${labelColor ||
                  'warning'} ml-1`}
              >
                {label}
              </sup>
            )}
            <b className={['fa fa-angle-left', s.caret].join(' ')} />
          </Button>
          {/* eslint-enable */}
          <Collapse className={s.panel} isOpen={isOpen}>
            <ul>
              {childrenLinks &&
                childrenLinks
                  .filter(
                    t =>
                      !t.permission ||
                      isHasPermission({ permission: t.permission }),
                  )
                  .map(child => (
                    <LinksGroup
                      activeItem={activeItem}
                      header={child.header}
                      isHeader={child.isHeader}
                      link={child.link}
                      index={child.index}
                      childrenLinks={child.childrenLinks}
                      deep={deep + 1}
                      key={child.index}
                    />
                  ))}
            </ul>
          </Collapse>
        </li>
      )}
    </>
  );
};

LinksGroup.propTypes = {
  header: PropTypes.node,
  link: PropTypes.string,
  childrenLinks: PropTypes.array,
  iconName: PropTypes.string,
  className: PropTypes.string,
  badge: PropTypes.string,
  label: PropTypes.string,
  index: PropTypes.string,
  deep: PropTypes.number,
  labelColor: PropTypes.string,
  exact: PropTypes.bool,
  isHeader: PropTypes.bool,
  isHasPermission: PropTypes.func,
};

export default LinksGroup;
