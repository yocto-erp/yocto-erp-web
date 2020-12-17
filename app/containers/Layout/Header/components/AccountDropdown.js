import React from 'react';
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import { mutate } from 'swr';
import { useHistory } from 'react-router-dom';
import s from '../Header.module.scss';
import avatar from '../../../../images/people/a5.jpg';
import { set, STORAGE } from '../../../../libs/utils/storage';
import useUser, { SWR_KEY_USER } from '../../../../libs/hooks/useUser';

const AccountDropDown = () => {
  const { user } = useUser();
  const history = useHistory();
  const logout = () => {
    set(STORAGE.JWT, null);
    history.push('/');
    return mutate(SWR_KEY_USER, null);
  };
  return (
    <UncontrolledDropdown nav>
      <DropdownToggle
        nav
        caret
        style={{
          color: '#f4f4f5',
          padding: 0,
          backgroundColor: 'transparent',
        }}
      >
        <span className={`${s.avatar} rounded-circle thumb-sm float-left mr-2`}>
          <img src={avatar} alt="..." />
        </span>
        <div
          className={`small ${s.accountCheck} text-truncate`}
          style={{ maxWidth: '100px' }}
        >
          {user?.email}
        </div>
      </DropdownToggle>
      <DropdownMenu right className={`${s.dropdownMenu} ${s.support}`}>
        <DropdownItem>
          <Badge color="primary">
            <i className="fi flaticon-user" />
          </Badge>
          <div className={s.details}>Profile</div>
        </DropdownItem>
        <DropdownItem onClick={logout}>
          <Badge color="secondary">
            <i className="glyphicon glyphicon-off" />
          </Badge>
          <div className={s.details}>Logout</div>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

AccountDropDown.propTypes = {};

export default AccountDropDown;
