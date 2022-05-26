import React from "react";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { mutate } from "swr";
import s from "../Header.module.scss";
import { set, STORAGE } from "../../../../libs/utils/storage";
import useUser, { SWR_KEY_USER } from "../../../../libs/hooks/useUser";
import { USER_ROOT_PATH } from "../../../user/constants";
import { cloudAssetUrl } from "../../../../libs/apis/image.api";

const AccountDropDown = () => {
  const { user } = useUser();
  const history = useHistory();
  const logout = () => {
    set(STORAGE.JWT, null);
    history.push("/");
    return mutate(SWR_KEY_USER, null);
  };
  return (
    <UncontrolledDropdown nav>
      <DropdownToggle
        nav
        caret
        style={{
          color: "#f4f4f5",
          padding: 0,
          backgroundColor: "transparent",
        }}
      >
        <span className={`${s.avatar} rounded-circle float-left mr-2`}>
          <img src={cloudAssetUrl(user?.avatar)} alt="..." />
        </span>
        <div
          className={`small ${s.accountCheck} text-truncate`}
          style={{ maxWidth: "100px" }}
        >
          {user?.displayName || user?.email}
        </div>
      </DropdownToggle>
      <DropdownMenu right className={`${s.dropdownMenu} ${s.support}`}>
        <DropdownItem onClick={() => history.push(`${USER_ROOT_PATH}/profile`)}>
          <Badge color="primary">
            <i className="fi flaticon-user" />
          </Badge>
          <div className={s.details}>Profile</div>
        </DropdownItem>
        <DropdownItem>
          <Link to="/orders">
            <Badge color="primary">
              <i className="glyphicon glyphicon-th-list" />
            </Badge>
            <span className={s.details}>Orders</span>
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link to="/admin">
            <Badge color="primary">
              <i className="glyphicon glyphicon-cog" />
            </Badge>
            <span className={s.details}>Administrator</span>
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link to="/workspace">
            <Badge color="primary">
              <i className="glyphicon glyphicon-th-list" />
            </Badge>
            <span className={s.details}>Change Workspace</span>
          </Link>
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
